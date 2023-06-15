import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async createUser(user: CreateUserDto) {
    const searchUser = await this.userRepository.findOneBy({ email: user.email });
    if (!searchUser) {
      await this.userRepository.save(user);
      return "create user...";
    }
    throw new HttpException("there is already such a user", HttpStatus.BAD_REQUEST);
  }

  async getAllUsers() {
    return await this.userRepository.find({ select: { login: true, email: true, id: true } });
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

}
