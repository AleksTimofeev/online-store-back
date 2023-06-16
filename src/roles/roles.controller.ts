import { Body, Controller, Get, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./roles.dto";

@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) {
  }

  @Post()
  createRole(@Body() role: CreateRoleDto){
    return this.rolesService.createRole(role)
  }

  @Get()
  getRoles(){
    return this.rolesService.getRoles()
  }

}
