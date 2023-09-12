import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.entity";
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { Product } from "./products/products.entity";
import { Basket } from "./basket/basket.entity";


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
      // entities: [User, Role, Product, Basket],
      // synchronize: true

      "name": "default",
      "type": "postgres",
      "url": process.env.URL,
      "synchronize": true,
      "logging": true,
      entities: [User, Role, Product, Basket]
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    ProductsModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
