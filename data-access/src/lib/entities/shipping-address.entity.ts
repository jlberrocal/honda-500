import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('shipping-addresses')
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column()
  zipCode!: string;

  @Column()
  signals!: string;
}
