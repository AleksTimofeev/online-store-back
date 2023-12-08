import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { ChangeProductDto, CreateProductsDto, GetProductsDto } from "./products.dto";

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
    if (!findProduct) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND)
    }
    return findProduct;
  }

  async getAllProducts(params: GetProductsDto) {
    const {pageNumber, pageSize} = params
    const products = await this.productRepository.findAndCount(
      {
        order: {
          [params.option]: params.sort
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }
    )
    if(!products){
      throw new HttpException('Products not found.', HttpStatus.NOT_FOUND)
    }
    return {products: products[0], totalCount: products[1]}
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
