import ICreateSpecialtyDTO from '@modules/specialties/interfaces/dtos/ICreateSpecialtyDTO';
import ISpecialty from '@modules/specialties/interfaces/models/ISpecialty';
import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';
import { getRepository, Repository } from 'typeorm';
import Specialty from '../entities/Specialty';

export default class SpecialtiesRepository implements ISpecialtiesRepository {
  private ormRepository: Repository<ISpecialty>;

  constructor() {
    this.ormRepository = getRepository(Specialty);
  }

  public async create(specialty: ICreateSpecialtyDTO): Promise<ISpecialty> {
    const specialtyCreated = this.ormRepository.create(specialty);
    await this.ormRepository.save(specialtyCreated);
    return specialtyCreated;
  }

  public async findAll(): Promise<ISpecialty[]> {
    const foundSpecialties = await this.ormRepository.find();
    return foundSpecialties;
  }

  public async findByIds(ids: string[]): Promise<ISpecialty[]> {
    const foundSpecialties = await this.ormRepository.findByIds(ids);
    return foundSpecialties;
  }

  public async findByName(name: string): Promise<ISpecialty | undefined> {
    const foundSpecialty = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return foundSpecialty;
  }
}
