import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductsDto } from "./products.dto";
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

  @Get(':id')
  getProductById(@Param('id') id: string){
    return this.productsService.getProductById(id)
  }

  @Get()
  getAllProducts(){
    return this.productsService.getAllProducts()
  }

}
