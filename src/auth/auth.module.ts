import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from "nest-bcrypt";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/users.entity";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    BcryptModule.register({
      salt: 5
    }),
    JwtModule.register({secret: process.env.SECRET, signOptions: {expiresIn: '24h'}}),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User])
  ],
  exports: [
    JwtModule,
    AuthModule
  ]
})
export class AuthModule {}
