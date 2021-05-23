import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';
import { CONFLICT, NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestCreateDoctorDTO from '../interfaces/dtos/IRequestCreateDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute({
    name,
    cellPhone,
    cep,
    crm,
    landline,
    specialtiesIds,
  }: IRequestCreateDoctorDTO): Promise<IDoctor> {
    const specialties = await this.specialtiesRepository.findByIds(
      specialtiesIds,
    );

    if (!specialties) {
      throw new AppError('Specialties not found', NOT_FOUND);
    }

    const cellPhoneExists = await this.doctorsRepository.findByCellPhone(
      cellPhone,
    );
    if (cellPhoneExists) {
      throw new AppError('CellPhone name already exists.', CONFLICT);
    }

    const crmExists = await this.doctorsRepository.findByCrm(crm);
    if (crmExists) {
      throw new AppError('CRM name already exists.', CONFLICT);
    }

    const doctor = await this.doctorsRepository.create({
      name,
      cellPhone,
      cep,
      crm,
      landline,
      specialties,
    });

    return doctor;
  }
}
