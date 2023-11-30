import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Basket } from "./basket.entity";
import { Repository } from "typeorm";
import { AddProductInBasketDto, BasketDto } from "./basket.dto";
import { ProductsService } from "../products/products.service";

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketRepository: Repository<Basket>,
    private productsService: ProductsService,
  ) {
  }

  async getBaskets(){
    return await this.basketRepository.find({relations: {products: true}})
  }
  async getBasketById(id: string){
    try {
      const findBasket = await this.basketRepository.findOne({where: {id}, relations: {products: true}})
      if(!findBasket){
        throw new HttpException('Basket not found', HttpStatus.BAD_REQUEST)
      }
      return findBasket
    }catch (e){
      throw new HttpException('Basket not found.', HttpStatus.BAD_REQUEST)
    }

  }

  async addProductInBasket(addProductInBasket: AddProductInBasketDto){
    const findBasket = await this.basketRepository.findOne({where: {id: addProductInBasket.basketId}, relations: {products: true}})
    const findProduct = await this.productsService.getProductById(addProductInBasket.productId)
    findBasket.products.push(findProduct)
    return this.basketRepository.save(findBasket)
  }

  async removeProductInBasket(basketId: string, productId: string){
    const findBasket = await this.getBasketById(basketId)
    const b = findBasket.products.filter(p => p.id !== productId)
    findBasket.products = b
    return await this.basketRepository.save(findBasket)
  }

  async createBasket(basketDto: BasketDto = {products: []}){
    const createBasket = await this.basketRepository.save(basketDto)
    debugger
    createBasket.products = []
    return await this.basketRepository.save(createBasket)
  }
}
