import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ChangeProductDto, CreateProductsDto } from "./products.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ) {}

  @Post()
  createProduct(@Body() createProduct: CreateProductsDto){
    return this.productsService.createProduct(createProduct)
  }
  @Delete(':id')
  removeProduct(@Param('id') id: string){
    return this.productsService.removeProduct(id)
  }

  // @Put()
  // changeProduct(@Body() changeProductDto: ChangeProductDto){
  //   return this.productsService.changeProduct(changeProductDto)
  // }

  @Get(':id')
  getProductById(@Param('id') id: string){
    return this.productsService.getProductById(id)
  }

  @Get()
  getAllProducts(){
    return this.productsService.getAllProducts()
  }

}
