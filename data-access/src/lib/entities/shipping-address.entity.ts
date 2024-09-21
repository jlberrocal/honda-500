import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseDetail } from './purchase-detail.entity';

@Entity('shipping-addresses')
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  zipCode!: number;

  @Column()
  signals!: string;

  @OneToOne(() => PurchaseDetail, (pd) => pd.shippingAddress, {
    nullable: true,
  })
  @JoinColumn()
  detail?: PurchaseDetail;
}
