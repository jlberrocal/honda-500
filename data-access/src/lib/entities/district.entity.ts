import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Canton } from './canton.entity';

@Entity('districts')
export class District {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Canton, (c) => c.districts, { nullable: false })
  canton!: Canton;
}
