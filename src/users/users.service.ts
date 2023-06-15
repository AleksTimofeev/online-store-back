import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService
  ) {
  }

  async createUser(user: CreateUserDto) {
    const searchUser = await this.userRepository.findOneBy({ email: user.email });
    if (!searchUser) {
      const role = await this.rolesService.findRole('user')
      const newUser = await this.userRepository.save(user);
      newUser.role = role
      await this.userRepository.save(newUser)
      return "create user...";
    }
    throw new HttpException("there is already such a user", HttpStatus.BAD_REQUEST);
  }

  async getAllUsers() {
    return await this.userRepository.find(
      { select: { login: true, email: true, id: true }, relations: {role: true} }
    );
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async changeUserRole(userId: string){
    const findUser = await this.userRepository.findOneBy({id: userId})
    const role = await this.rolesService.findRole('admin')
    findUser.role = role

    return await this.userRepository.save(findUser)
  }

}
