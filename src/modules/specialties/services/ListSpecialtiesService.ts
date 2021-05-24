import { inject, injectable } from 'tsyringe';
import ISpecialty from '../interfaces/models/ISpecialty';
import ISpecialtiesRepository from '../interfaces/repositories/ISpecialtiesRepository';

@injectable()
export default class ListSpecialtiesService {
  constructor(
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  public async execute(): Promise<ISpecialty[]> {
    const specialties = await this.specialtiesRepository.findAll();
    return specialties;
  }
}
