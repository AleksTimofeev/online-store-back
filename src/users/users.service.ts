import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  AddProductInBasketDto,
  ChangeUserRoleDto,
  CreateUserDto,
} from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { RolesService } from "../roles/roles.service";
import { BasketService } from "../basket/basket.service";
import { ProductsService } from "../products/products.service";
import { UUID } from "crypto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService,
    private basketService: BasketService,
    private productsService: ProductsService
  ) {
  }

  async createUser(user: CreateUserDto) {
    const searchUser = await this.userRepository.findOneBy({ email: user.email });
    if (searchUser) {
      throw new HttpException("Пользователь с такими данными уже существует.", HttpStatus.BAD_REQUEST);
    }
    const role = await this.rolesService.findRole("user");
    const basket = await this.basketService.createBasket();
    const newUser = await this.userRepository.save(user);
    newUser.role = [role];
    newUser.basket = basket;
    await this.userRepository.save(newUser);
    return await this.userRepository.findOne({
      where: { id: newUser.id },
      relations: { basket: true, role: true }
    });
  }

  async getAllUsers() {
    return await this.userRepository.find(
      { select: { login: true, email: true, id: true }, relations: { role: true, basket: { products: true } } }
    );
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { role: true, basket: true }
    });
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserById(id: string) {
    try {
      const findUser = await this.userRepository.findOne({ where: { id }, relations: { role: true, basket: true } });
      if(!findUser){
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
      }
      return findUser
    }catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }

  }

  async changeUserRole(changeUserRole: ChangeUserRoleDto) {
    const findUser = await this.userRepository.findOne({ where: { id: changeUserRole.id }, relations: { role: true } });
    const role = await this.rolesService.findRole(changeUserRole.role);
    const userRoles = findUser.role
    if(
      userRoles.find(r => r.role === changeUserRole.role)
    ){
      findUser.role = userRoles.filter(r => r.role !== changeUserRole.role)
      await this.userRepository.save(findUser)
      return HttpStatus.OK
    }
    findUser.role.push(role);
    await this.userRepository.save(findUser);
    return HttpStatus.OK
  }

  async addRoleForUser(changeUserRole: ChangeUserRoleDto) {
    const findUser = await this.userRepository.findOne({ where: { id: changeUserRole.id }, relations: { role: true } });
    const role = await this.rolesService.findRole(changeUserRole.role);
    if(!findUser){throw new HttpException('User not found', HttpStatus.NOT_FOUND)}
    if(!role){throw new HttpException('Role not found', HttpStatus.NOT_FOUND)}
    if(findUser.role.find(r => r.role === changeUserRole.role)){
      throw new HttpException('Такая роль уже присвоена этому пользователю', HttpStatus.BAD_REQUEST)
    }
    findUser.role.push(role);
    await this.userRepository.save(findUser);
    return findUser
  }

  async removeRoleUser(changeUserRole: ChangeUserRoleDto) {
    const findUser = await this.userRepository.findOne({ where: { id: changeUserRole.id }, relations: { role: true } });
    const role = await this.rolesService.findRole(changeUserRole.role);
    if(!findUser){throw new HttpException('User not found', HttpStatus.NOT_FOUND)}
    if(!role){throw new HttpException('Role not found', HttpStatus.NOT_FOUND)}
    findUser.role = findUser.role.filter(role => role.role !== changeUserRole.role)
    await this.userRepository.save(findUser);
    return findUser
  }

  async removeUser(id: string) {
    return await this.userRepository.delete({ id });
  }

  async addProductInUserBasket(addProductInBasket: AddProductInBasketDto) {
    const { productId, userId } = addProductInBasket;
    const findProduct = await this.productsService.getProductById(productId);
    const findUser = await this.userRepository.findOne({ where: { id: userId }, relations: {basket: true} });
    if(!findProduct && !findUser){
      throw new HttpException('Product or User not found.', HttpStatus.BAD_REQUEST)
    }
    return await this.basketService.addProductInBasket({ productId, basketId: findUser.basket.id });
  }

  async removeProductInBasket(productId: string, email: string) {
    const findUser = await this.userRepository.findOne({ where: { email }, relations: {basket: true} });
    return await this.basketService.removeProductInBasket(findUser.basket.id, productId);
  }

}
