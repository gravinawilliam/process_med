import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import IDoctor from '@modules/doctors/interfaces/models/IDoctor';
import Specialty from '@modules/specialties/infra/typeorm/entities/Specialty';
import ISpecialty from '@modules/specialties/interfaces/models/ISpecialty';
import EncryptionDataBase from '@shared/utils/EncryptionDataBase';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';

@Entity('doctors')
export default class Doctor implements IDoctor {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '120',
    transformer: EncryptionDataBase,
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    transformer: EncryptionDataBase,
  })
  crm: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  landline: string;

  @Column({
    type: 'varchar',
    unique: true,
    transformer: EncryptionDataBase,
  })
  cellPhone: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  cep: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  city: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  state: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  neighborhood: string;

  @Column({
    type: 'varchar',
    transformer: EncryptionDataBase,
  })
  street: string;

  @ManyToMany(() => Specialty, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'specialties_doctors',
    joinColumns: [{ name: 'doctor_id' }],
    inverseJoinColumns: [{ name: 'specialty_id' }],
  })
  specialties: ISpecialty[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}
