import { IsEmail, IsNotEmpty, Length, min } from "class-validator";
import { UUID } from "crypto";

export class CreateUserDto {

  @IsNotEmpty()
  readonly login: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @Length(5)
  readonly password: string
}

export class FindUserByIdDto {
  @IsNotEmpty()
  readonly id: UUID
}

export class ChangeUserRoleDto {
  @IsNotEmpty()
  readonly id: UUID

  @IsNotEmpty()
  readonly role: string
}

export class AddProductInBasketDto {
  @IsNotEmpty()
  readonly productId: string

  @IsNotEmpty()
  readonly userId: string
}