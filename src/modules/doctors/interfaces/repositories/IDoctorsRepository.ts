import ICreateDoctorDTO from '../dtos/ICreateDoctorDTO';
import IDoctor from '../models/IDoctor';

export default interface IDoctorsRepository {
  create(doctor: ICreateDoctorDTO): Promise<IDoctor>;
  findByCellPhone(cellPhone: string): Promise<IDoctor | undefined>;
  findByCrm(crm: string): Promise<IDoctor | undefined>;
  findById(id: string): Promise<IDoctor | undefined>;
  save(doctor: IDoctor): Promise<IDoctor>;
}
