import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ChangeUserRoleDto } from "./users.dto";

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get()
  getAllUsers(@Req() request: Request){
    return this.usersService.getAllUsers()
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string){
    return this.usersService.findUserByEmail(email)
  }

  @Roles('superAdmin')
  @UseGuards(RolesGuard)
  @Post()
  changeUserRole(@Body() changeUserRole: ChangeUserRoleDto){
    return this.usersService.changeUserRole(changeUserRole)
  }

  @Roles('superAdmin')
  @UseGuards(RolesGuard)
  @Post('add-role-user')
  addRoleForUser(@Body() changeUserRole: ChangeUserRoleDto){
    return this.usersService.addRoleForUser(changeUserRole)
  }

  @Roles('superAdmin')
  @UseGuards(RolesGuard)
  @Delete('remove-role-user')
  removeRoleUser(@Body() changeUserRole: ChangeUserRoleDto){
    return this.usersService.removeRoleUser(changeUserRole)
  }


  @Delete(':userId')
  removeUser(@Param('userId') userId: string){
    return this.usersService.removeUser(userId)
  }

  @UseGuards(AuthGuard)
  @Post('addInBasket/:productId')
  addProductInUserBasket(@Param('productId') productId: string, @Req() req: any){
    return this.usersService.addProductInUserBasket({productId, userId: req.user.id})
  }

  @UseGuards(AuthGuard)
  @Delete('remove-product-basket/:productId')
  removeProductInBasket(@Param('productId') productId: string ,@Req() request: any){
    return this.usersService.removeProductInBasket(productId, request.user.email)
  }

}
