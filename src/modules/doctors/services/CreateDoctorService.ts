import { CONFLICT } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
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
    const cellPhoneExists = await this.doctorsRepository.findByCellPhone(
      cellPhone,
    );
    if (cellPhoneExists) {
      throw new AppError('CellPhone name already exists.', CONFLICT);
    }

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
