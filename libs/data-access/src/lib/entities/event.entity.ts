import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { Purchase } from './purchase.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @OneToMany(() => Product, (p) => p.event, { nullable: false })
  products?: Product[];

  @OneToMany(() => Purchase, (p) => p.event, { eager: true, nullable: false })
  purchases?: Purchase[];
}
