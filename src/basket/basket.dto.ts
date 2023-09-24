import { Product } from "../products/products.entity";
import { IsNotEmpty } from "class-validator";


export class BasketDto {
  products: Product[]
}

export class AddProductInBasketDto {
  @IsNotEmpty()
  readonly productId: string

  @IsNotEmpty()
  readonly basketId: string
}