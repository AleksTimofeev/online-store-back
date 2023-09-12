import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ChangeProductDto, ProductsDto } from "./products.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService
  ) {}

  @Post()
  createProduct(@Body() productsDto: ProductsDto){
    return this.productsService.createProduct(productsDto)
  }

  @Put()
  changeProduct(@Body() changeProductDto: ChangeProductDto){
    return this.productsService.changeProduct(changeProductDto)
  }

  @Get(':id')
  getProductById(@Param('id') id: string){
    return this.productsService.getProductById(id)
  }

  @Get()
  getAllProducts(){
    return this.productsService.getAllProducts()
  }

}
