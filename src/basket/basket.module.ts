import { forwardRef, Module } from "@nestjs/common";
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/products.entity";
import { Basket } from "./basket.entity";
import { ProductsModule } from "../products/products.module";
import { User } from "../users/users.entity";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    TypeOrmModule.forFeature([Product, Basket, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule)
  ],
  exports: [BasketService]
})
export class BasketModule {}
