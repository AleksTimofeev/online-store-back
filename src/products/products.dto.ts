

export class CreateProductsDto {
  readonly title: string
  readonly description: string
  readonly minDescription: string
  readonly rating: string
  readonly price: string
  readonly imgUrlLarge: string | null
  readonly imgUrlSmall: string | null
}
export class ChangeProductDto {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly minDescription: string
  readonly rating: number
  readonly price: number
  readonly imgUrlLarge: string | null
  readonly imgUrlSmall: string | null
}