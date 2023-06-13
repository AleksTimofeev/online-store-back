import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";


export class RegistrationDto {

  @IsNotEmpty()
  readonly login: string

  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}

export class LoginDto {
  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly password: string
}