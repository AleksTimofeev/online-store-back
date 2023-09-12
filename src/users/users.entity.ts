import {
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "../roles/roles.entity";
import { Basket } from "../basket/basket.entity";

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

  @ManyToMany(() => Role)
  @JoinTable()
  role: Role[]

  @OneToOne(() => Basket, (basket) => basket.id)
  @JoinColumn()
  basket: Basket
}