

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
  readonly id: string
  readonly title: string
  readonly description: string
  readonly minDescription: string
  readonly rating: string
  readonly price: string
  readonly imgUrlLarge: string
  readonly imgUrlSmall: string
}