import { v4 } from 'uuid';
import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '../interfaces/dtos/ICreateDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

export default class FakeDoctorsRepository implements IDoctorsRepository {
  private doctors: IDoctor[] = [];

  public async create(doctor: ICreateDoctorDTO): Promise<IDoctor> {
    const doctorCreated = Object.assign(new Doctor(), {
      id: v4(),
      ...doctor,
    });
    this.doctors.push(doctorCreated);
    return doctorCreated;
  }
}
