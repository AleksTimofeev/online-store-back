import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/users.dto";
import { BcryptService } from "nest-bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    private userService: UsersService,
  ) {
  }


  async registration(createUserDto: CreateUserDto){

      const pass = await this.bcryptService.hash(createUserDto.password)
      return await this.userService.createUser({ ...createUserDto, password: pass })

  }

  async login(loginDto: LoginDto){

    const findUser = await this.userService.findUser(loginDto.email)

    if(!findUser){
      throw new HttpException('password or email not correct.', HttpStatus.BAD_REQUEST)
    }

    const passwordToEqual = this.bcryptService.compare(loginDto.password, findUser.password)

    if(!passwordToEqual){
      throw new HttpException('password or email not correct.', HttpStatus.BAD_REQUEST)
    }

    return 'login ok.'

  }

}
