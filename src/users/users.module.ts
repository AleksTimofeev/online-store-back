import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { AuthModule } from "../auth/auth.module";
import { RolesModule } from "../roles/roles.module";
import { Role } from "../roles/roles.entity";
import { Basket } from "../basket/basket.entity";
import { BasketModule } from "../basket/basket.module";
import { ProductsModule } from "../products/products.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role, Basket]),
    forwardRef(() => AuthModule),
    RolesModule,
    forwardRef(() => BasketModule),
    forwardRef(() => ProductsModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
