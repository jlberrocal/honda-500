import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Purchase } from './purchase.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @ManyToMany(() => Member, (me) => me.events, { eager: true })
  @JoinTable()
  members?: Member[];

  @OneToMany(() => Purchase, (p) => p.event, {eager: true})
  purchases?: Purchase[];
}
