import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "postgres",
      // password: "Sasha26031003",
      // database: "nest-test-project",
      // entities: [User],
      // synchronize: true
      "name": "default",
      "type": "postgres",
      "url": process.env.URL,
      "synchronize": true,
      "logging": true,
      entities: [User]
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
