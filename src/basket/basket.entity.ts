import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/products.entity";


@Entity('basket')
export class Basket{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable()
  products: Product[]

}