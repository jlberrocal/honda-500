import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ type: 'float' })
  normalPrice!: number;

  @Column()
  discountPercentage!: string;

  @Column({ type: 'float' })
  totalPrice!: number;

  @OneToMany(() => Purchase, (p) => p.product)
  purchases?: Purchase[];
}
