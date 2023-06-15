import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./users.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(){
    return this.usersService.getAllUsers()
  }

  @Get(':email')
  async findUser(@Param('email') email: string){
    const user = await this.usersService.findUser(email)
    const {password, ...rest} = user
    return rest
  }

  @Post()
  changeUserRole(@Body() id: {id: string}){
    return this.usersService.changeUserRole(id.id)
  }

}
