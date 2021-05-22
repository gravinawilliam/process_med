import { v4 } from 'uuid';
import Specialty from '../infra/typeorm/entities/Specialty';
import ICreateSpecialtyDTO from '../interfaces/dtos/ICreateSpecialtyDTO';
import ISpecialty from '../interfaces/models/ISpecialty';
import ISpecialtiesRepository from '../interfaces/repositories/ISpecialtiesRepository';

export default class FakeSpecialtiesRepository
  implements ISpecialtiesRepository
{
  private specialties: ISpecialty[] = [];

  public async create(specialty: ICreateSpecialtyDTO): Promise<ISpecialty> {
    const specialtyCreated = Object.assign(new Specialty(), {
      id: v4(),
      ...specialty,
    });
    this.specialties.push(specialtyCreated);
    return specialtyCreated;
  }

  public async findByName(name: string): Promise<ISpecialty | undefined> {
    const foundSpecialty = this.specialties.find(
      specialty => specialty.name === name,
    );
    return foundSpecialty;
  }
}
