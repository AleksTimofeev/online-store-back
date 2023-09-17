import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  minDescription: string

  @Column()
  rating: string

  @Column()
  price: string

  @Column()
  imgUrlLarge: string

  @Column()
  imgUrlSmall: string

}