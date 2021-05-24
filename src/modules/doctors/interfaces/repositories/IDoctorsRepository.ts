import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import ISearchDoctorDTO from '../dtos/ISearchDoctorDTO';
import IDoctor from '../models/IDoctor';

export default interface IDoctorsRepository {
  create(doctor: ICreateDoctorDTO): Promise<IDoctor>;
  delete(id: string): Promise<void>;
  findByCellPhone(cellPhone: string): Promise<IDoctor | undefined>;
  findByCrm(crm: string): Promise<IDoctor | undefined>;
  findDoctors({
    cellPhone,
    cep,
    crm,
    landline,
    name,
  }: ISearchDoctorDTO): Promise<IDoctor[]>;
  findById(id: string): Promise<IDoctor | undefined>;
  save(doctor: IDoctor): Promise<IDoctor>;
}
