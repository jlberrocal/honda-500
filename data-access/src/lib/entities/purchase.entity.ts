import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { Member } from './member.entity';
import { PurchaseDetail } from './purchase-detail.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Member, (m) => m.purchases, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  member?: Member;

  @Column({nullable: true})
  nonMemberName?: string;

  @Column({nullable: true})
  nonMemberPhone?: string;

  @ManyToOne(() => EventEntity, (e) => e.purchases, {
    cascade: true,
    nullable: false,
  })
  event!: EventEntity;

  @OneToMany(() => PurchaseDetail, (pd) => pd.purchase, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  details?: PurchaseDetail[];
}
