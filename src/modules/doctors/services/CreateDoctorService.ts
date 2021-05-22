import { inject, injectable } from 'tsyringe';
import ICreateDoctorDTO from '../interfaces/dtos/ICreateDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    name,
    cellPhone,
    cep,
    crm,
    landline,
  }: ICreateDoctorDTO): Promise<IDoctor> {
    const doctor = await this.doctorsRepository.create({
      name,
      cellPhone,
      cep,
      crm,
      landline,
    });
    return doctor;
  }
}
