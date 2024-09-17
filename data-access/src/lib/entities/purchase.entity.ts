import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { Member } from './member.entity';
import { Product } from './products.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Product, (p) => p.purchases, { eager: true })
  @JoinTable()
  product!: Product;

  @ManyToOne(() => Member, { eager: true })
  @JoinTable()
  member!: Member;

  @ManyToOne(() => EventEntity, (e) => e.purchases)
  @JoinTable()
  event!: EventEntity;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ default: 'pickup' })
  shippingMethod!: string;

  @Column({ nullable: true })
  someoneName?: string;
}
