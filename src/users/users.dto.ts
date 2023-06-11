import { IsNotEmpty, Length, min } from "class-validator";
import { UUID } from "crypto";

export class CreateUserDto {

  @IsNotEmpty()
  readonly login: string

  @IsNotEmpty()
  readonly email: string

  @Length(5)
  readonly password: string
}

export class FindUserDto {
  @IsNotEmpty()
  readonly id: UUID
}