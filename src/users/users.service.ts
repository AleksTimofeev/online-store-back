import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChangeUserRoleDto, CreateUserDto, FindUserByIdDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { RolesService } from "../roles/roles.service";
import { BasketService } from "../basket/basket.service";
import { ProductsService } from "../products/products.service";

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
    return await this.userRepository.findOne({ where: { id } });
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

  async removeUser(id: string) {
    return await this.userRepository.delete({ id });
  }

  async addProductInUserBasket(addProduct: { productId: string, userId: string }) {
    const { productId, userId } = addProduct;
    const findProduct = await this.productsService.getProductById(productId);
    const findUser = await this.userRepository.findOne({ where: { id: userId } });
    const findBasket = await this.basketService.getBasketById(findUser.basket.id);
    return await this.basketService.addProductInBasket(addProduct.productId, findUser.basket.id);
  }

  async removeProductInBasket(productId: string, email: string) {
    const findUser = await this.userRepository.findOne({ where: { email } });
    return await this.basketService.removeProductInBasket(findUser.basket.id, productId);
  }

}
