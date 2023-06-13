import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, FindUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDto){
    return this.usersService.createUser(user)
  }

  @Get()
  getAllUsers(){
    return this.usersService.getAllUsers()
  }

  @Get(':email')
  findUser(@Param('email') email: string){
    return this.usersService.findUser(email)
  }

}
