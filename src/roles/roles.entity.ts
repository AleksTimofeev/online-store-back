import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  role: string

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}