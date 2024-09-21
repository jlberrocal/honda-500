import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Canton } from './canton.entity';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Canton, (c) => c.province, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  cantons!: Canton[];
}
