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
    const specialty = await this.specialtiesRepository.create({
      name,
    });
    return specialty;
  }
}
