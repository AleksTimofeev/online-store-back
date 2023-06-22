import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/roles.entity";
import { Basket } from "../basket/basket.entity";
import { Product } from "../products/products.entity";


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({unique: true})
  login: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @ManyToOne(() => Role, (role) => role.role)
  role: Role

  @OneToOne(() => Basket, (basket) => basket.id)
  @JoinColumn()
  basket: Basket
}