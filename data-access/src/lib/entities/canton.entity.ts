import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { District } from './district.entity';
import { Province } from './province.entity';

@Entity('cantons')
export class Canton {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => District, d => d.canton, { eager: true, cascade: true })
  districts!: District[];

  @ManyToOne(() => Province, (p) => p.cantons)
  province!: Province;
}
