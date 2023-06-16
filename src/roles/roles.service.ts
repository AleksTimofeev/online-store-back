import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./roles.entity";
import { CreateRoleDto } from "./roles.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {
  }

  async createRole(role: CreateRoleDto){
    const newRole = await this.roleRepository.save(role)

    return newRole
  }

  async findRole(role: string){
    return await this.roleRepository.findOneBy({role})
  }

  async getRoles(){
    return await this.roleRepository.find({relations: {users: true}})
  }

}
