import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';

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

  @ManyToOne(() => EventEntity, (e) => e.products)
  event?: EventEntity;
}
