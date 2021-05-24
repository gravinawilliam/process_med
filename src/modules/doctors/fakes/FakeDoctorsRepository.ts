import { v4 } from 'uuid';
import Doctor from '../infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '../interfaces/dtos/ICreateDoctorDTO';
import ISearchDoctorDTO from '../interfaces/dtos/ISearchDoctorDTO';
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

  public async delete(id: string): Promise<void> {
    const findIndex = this.doctors.findIndex(doctor => doctor.id === id);
    this.doctors[findIndex].deletedAt = new Date();
  }

  public async findByCellPhone(
    cellPhone: string,
  ): Promise<IDoctor | undefined> {
    const foundDoctor = this.doctors.find(
      doctor => doctor.cellPhone === cellPhone,
    );
    return foundDoctor;
  }

  public async findByCrm(crm: string): Promise<IDoctor | undefined> {
    const foundDoctor = this.doctors.find(doctor => doctor.crm === crm);
    return foundDoctor;
  }

  public async findDoctors(data: ISearchDoctorDTO): Promise<IDoctor[]> {
    const {
      cellPhone,
      cep,
      crm,
      landline,
      name,
      city,
      neighborhood,
      state,
      street,
    } = data;
    const foundDoctor = this.doctors.filter(
      doctor =>
        doctor.cellPhone === cellPhone ||
        doctor.cep === cep ||
        doctor.crm === crm ||
        doctor.landline === landline ||
        doctor.city === city ||
        doctor.neighborhood === neighborhood ||
        doctor.state === state ||
        doctor.street === street ||
        doctor.name === name,
    );
    return foundDoctor;
  }

  public async findById(id: string): Promise<IDoctor | undefined> {
    const foundDoctor = this.doctors.find(doctor => doctor.id === id);
    return foundDoctor;
  }

  public async save(doctor: IDoctor): Promise<IDoctor> {
    const findIndex = this.doctors.findIndex(doc => doc.id === doctor.id);
    this.doctors[findIndex] = doctor;
    return doctor;
  }
}
