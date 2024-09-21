import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { Purchase } from './purchase.entity';
import { ShippingAddress } from './shipping-address.entity';

@Entity('purchase-details')
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Product, { eager: true, nullable: false })
  product!: Product;

  @ManyToOne(() => Purchase, (p) => p.details, { nullable: false })
  purchase!: Purchase;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ default: 'pickup' })
  shippingMethod!: string;

  @Column({ nullable: true })
  someoneName?: string;

  @OneToOne(() => ShippingAddress, sa => sa.detail, {nullable: true, eager: true})
  shippingAddress?: ShippingAddress;
}
