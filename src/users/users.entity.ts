import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../roles/roles.entity";


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
}