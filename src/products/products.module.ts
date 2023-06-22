import { forwardRef, Module } from "@nestjs/common";
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Basket } from "../basket/basket.entity";
import { BasketModule } from "../basket/basket.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Basket]),
    forwardRef(() => BasketModule),
    forwardRef(() => UsersModule)
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
