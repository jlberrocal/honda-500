import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ nullable: true })
  nationalId?: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  plate!: string;

  @Column()
  familyPhone!: string;

  @Column({ type: 'datetime' })
  requestedDate!: Date;

  @Column({ type: 'datetime' })
  addedDate!: Date;

  @Column()
  province!: string;

  @OneToMany(() => Purchase, (p) => p.member)
  purchases?: Purchase[];
}
