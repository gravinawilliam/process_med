import ISpecialty from '@modules/specialties/interfaces/models/ISpecialty';

export default interface IDoctor {
  readonly id: string;
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  specialties: ISpecialty[];
  createdAt: Date;
  updatedAt: Date;
}
