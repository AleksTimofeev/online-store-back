import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/users.dto";
import { BcryptService } from "nest-bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    const user = await this.userRepository.findOne(
      {where: {email: loginDto.email}, relations: {basket: true, role: true}}
    )
      const passwordToEqual = await this.bcryptService.compare(loginDto.password, user.password);
      if(!passwordToEqual || !user){
        throw new HttpException("password or email not correct.", HttpStatus.BAD_REQUEST);
      }
      const {password, ...payload} = user
      return this.generateToken(payload)
  }

  private generateToken(payload){
    const token = this.jwtService.sign(payload)
    return {token}
  }

}
