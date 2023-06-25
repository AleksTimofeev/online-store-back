import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
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
  getAllUsers(@Req() request: Request){
    return this.usersService.getAllUsers()
  }

  @UseGuards(AuthGuard)
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

  @Delete(':userId')
  removeUser(@Param('userId') userId: string){
    return this.usersService.removeUser(userId)
  }

  @Post('addInBasket')
  addProductInUserBasket(@Body() addProductInBasket: {productId: string, userEmail: string}){
    return this.usersService.addProductInUserBasket(addProductInBasket)
  }

  @UseGuards(AuthGuard)
  @Delete(':productId')
  removeProductInBasket(@Param('productId') productId: string ,@Req() request: any){
    return this.usersService.removeProductInBasket(productId, request.user.email)
  }

}
