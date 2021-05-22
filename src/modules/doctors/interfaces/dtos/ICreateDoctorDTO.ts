import ISpecialty from '@modules/specialties/interfaces/models/ISpecialty';

export default interface ICreateDoctorDTO {
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  specialties: ISpecialty[];
}
