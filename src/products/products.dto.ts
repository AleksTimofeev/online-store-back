import { IsNotEmpty, IsString } from "class-validator";


export class CreateProductsDto {
  readonly title: string
  readonly description: string
  readonly minDescription: string
  readonly rating: string
  readonly price: string
  readonly imgUrlLarge: string
  readonly imgUrlSmall: string
}
export class ChangeProductDto {
  @IsString()
  readonly id: string
  @IsString()
  readonly title: string
  @IsString()
  readonly description: string
  @IsString()
  readonly minDescription: string
  @IsString()
  readonly rating: string
  @IsString()
  readonly price: string
  @IsString()
  readonly imgUrlLarge: string
  @IsString()
  readonly imgUrlSmall: string
}