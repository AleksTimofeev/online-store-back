import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { ChangeProductDto, ProductsDto } from "./products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(productDto: ProductsDto){
    return await this.productRepository.save(productDto)
  }

  async getProductById(id: string){
    const findProduct = await this.productRepository.findOneBy({id})
    if(findProduct){
      return findProduct
    }
  }

  async getAllProducts(){
    return await this.productRepository.find()
  }

  async changeProduct(changeProductDto: ChangeProductDto) {
    const findProduct = await this.productRepository.findOneBy({id: changeProductDto.id})
    if(findProduct){
      return await this.productRepository.save(changeProductDto)
    }else{
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
  }
}
