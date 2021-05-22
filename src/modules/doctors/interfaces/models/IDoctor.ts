export default interface IDoctor {
  readonly id: string;
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  createdAt: Date;
  updatedAt: Date;
}
