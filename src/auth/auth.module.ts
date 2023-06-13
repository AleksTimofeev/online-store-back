import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from "nest-bcrypt";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    BcryptModule.register({
      salt: 5
    }),
    UsersModule
  ]
})
export class AuthModule {}
