export default interface IUpdateDoctorDTO {
  doctorId: string;
  name?: string;
  crm?: string;
  landline?: string;
  cellPhone?: string;
  cep?: string;
  specialtiesIds?: string[];
}
