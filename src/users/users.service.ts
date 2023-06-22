import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./users.dto";
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
    if (!searchUser) {
      const role = await this.rolesService.findRole("user");
      const basket = await this.basketService.createBasket();
      const newUser = await this.userRepository.save(user);
      newUser.role = role;
      newUser.basket = basket;
      await this.userRepository.save(newUser);
      return "create user...";
    }
    throw new HttpException("there is already such a user", HttpStatus.BAD_REQUEST);
  }

  async getAllUsers() {
    return await this.userRepository.find(
      { select: { login: true, email: true, id: true }, relations: { role: true, basket: { products: true } } }
    );
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOne(
      { where: { email }, relations: { basket: { products: true } } }
    );
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async changeUserRole(userId: string) {
    const findUser = await this.userRepository.findOneBy({ id: userId });
    const role = await this.rolesService.findRole("admin");
    findUser.role = role;
    return await this.userRepository.save(findUser);
  }

  async addProductInUserBasket(addProductInBasket: { productId: string, userEmail: string }) {
    const findProduct = await this.productsService.getProductById(addProductInBasket.productId);
    const findUser = await this.findUser(addProductInBasket.userEmail);
    const findBasket = await this.basketService.getBasketById(findUser.basket.id);
    return await this.basketService.addProductInBasket(addProductInBasket.productId, findUser.basket.id);
  }

  async removeProductInBasket(productId: string, email: string) {
    const findUser = await this.findUser(email);
    return await this.basketService.removeProductInBasket(findUser.basket.id, productId);
  }

}
