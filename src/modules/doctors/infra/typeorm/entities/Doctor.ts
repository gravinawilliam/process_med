import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import IDoctor from '@modules/doctors/interfaces/models/IDoctor';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('doctors')
export default class Doctor implements IDoctor {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '120',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  crm: string;

  @Column({
    type: 'varchar',
  })
  landline: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  cellPhone: string;

  @Column({
    type: 'varchar',
  })
  cep: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
