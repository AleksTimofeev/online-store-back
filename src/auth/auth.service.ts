import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/users.dto";
import { BcryptService } from "nest-bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async registration(createUserDto: CreateUserDto) {
    const hashPass = await this.bcryptService.hash(createUserDto.password);
    const createUser = await this.userService.createUser({ ...createUserDto, password: hashPass });
    const {password, ...payload} = createUser
    return this.generateToken(payload)
  }

  async login(loginDto: LoginDto) {
    try {
      const findUser = await this.userService.findUser(loginDto.email);
      const passwordToEqual = await this.bcryptService.compare(loginDto.password, findUser.password);
      if (passwordToEqual && findUser) {
        const {password, ...payload} = findUser
        return this.generateToken(payload)
      }
    }catch (e){
      throw new HttpException("password or email not correct.", HttpStatus.BAD_REQUEST);
    }
  }

  private generateToken(payload){
    const token = this.jwtService.sign(payload)
    return {token}
  }

}
