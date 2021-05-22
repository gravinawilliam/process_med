export default interface IRequestCreateDoctorDTO {
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  specialtiesIds: string[];
}
