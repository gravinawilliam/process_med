import { CONFLICT } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateSpecialtyDTO from '../interfaces/dtos/ICreateSpecialtyDTO';
import ISpecialty from '../interfaces/models/ISpecialty';
import ISpecialtiesRepository from '../interfaces/repositories/ISpecialtiesRepository';

@injectable()
export default class CreateSpecialtyService {
  constructor(
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute({ name }: ICreateSpecialtyDTO): Promise<ISpecialty> {
    const nameExists = await this.specialtiesRepository.findByName(name);
    if (nameExists) {
      throw new AppError('Specialty name already exists.', CONFLICT);
    }

    const specialty = await this.specialtiesRepository.create({
      name,
    });
    return specialty;
  }
}
