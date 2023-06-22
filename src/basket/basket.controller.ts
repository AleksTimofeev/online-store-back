import { Controller, Get, Param } from "@nestjs/common";
import { BasketService } from "./basket.service";

@Controller('basket')
export class BasketController {
  constructor(
    private basketService: BasketService
  ) {}

  @Get()
  getBaskets(){
    return this.basketService.getBaskets()
  }

  @Get(':id')
  getBasketInId(@Param('id') id: string){
    return this.basketService.getBasketById(id)
  }

  @Get('create')
  createBasket(){
    return this.basketService.createBasket()
  }

}
