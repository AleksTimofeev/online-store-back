import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { ChangeProductDto, CreateProductsDto } from "./products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {
  }

  async createProduct(createProduct: CreateProductsDto) {
    return await this.productRepository.save(createProduct);
  }

  async getProductById(id: string) {
    const findProduct = await this.productRepository.findOneBy({ id });
    if (findProduct) {
      return findProduct;
    }
  }

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async changeProduct(changeProductDto: ChangeProductDto) {
      const findProduct = await this.productRepository.findOneBy({ id: changeProductDto.id });
      if(findProduct){
      await this.productRepository.update({ id: changeProductDto.id }, { ...changeProductDto });
      return changeProductDto;
      }
      else{
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
      }
    }

  async removeProduct(id: string) {
    try {
      return await this.productRepository.delete({ id });
    } catch (e) {
      throw new HttpException("remove product wrong", HttpStatus.BAD_REQUEST);
    }
  }

}
