import { Body, Controller, Injectable, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "../users/users.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./auth.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }


  @Post('registration')
  @UsePipes(ValidationPipe)
  registration(@Body() createUserDto: CreateUserDto){
    return this.authService.registration(createUserDto)
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

}
