import ICreateDoctorDTO from '@modules/doctors/interfaces/dtos/ICreateDoctorDTO';
import IDoctor from '@modules/doctors/interfaces/models/IDoctor';
import IDoctorsRepository from '@modules/doctors/interfaces/repositories/IDoctorsRepository';
import { getRepository, Repository } from 'typeorm';
import Doctor from '../entities/Doctor';

export default class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<IDoctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create(doctor: ICreateDoctorDTO): Promise<IDoctor> {
    const doctorCreated = this.ormRepository.create(doctor);
    await this.ormRepository.save(doctorCreated);
    return doctorCreated;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findByCellPhone(
    cellPhone: string,
  ): Promise<IDoctor | undefined> {
    const foundDoctor = await this.ormRepository.findOne({
      where: {
        cellPhone,
      },
    });
    return foundDoctor;
  }

  public async findByCrm(crm: string): Promise<IDoctor | undefined> {
    const foundDoctor = await this.ormRepository.findOne({
      where: {
        crm,
      },
    });
    return foundDoctor;
  }

  public async findById(id: string): Promise<IDoctor | undefined> {
    const foundDoctor = await this.ormRepository.findOne(id);
    return foundDoctor;
  }

  public async save(doctor: IDoctor): Promise<IDoctor> {
    await this.ormRepository.save(doctor);
    return doctor;
  }
}
