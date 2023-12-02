import { IsNumber, IsString } from "class-validator";


export class CreateProductsDto {
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
export class GetProductsDto {
  @IsNumber()
  readonly pageSize: number

  @IsNumber()
  readonly pageNumber: number
}