import ICreateSpecialtyDTO from '../dtos/ICreateSpecialtyDTO';
import ISpecialty from '../models/ISpecialty';

export default interface ISpecialtiesRepository {
  create(specialty: ICreateSpecialtyDTO): Promise<ISpecialty>;
  findByIds(ids: string[]): Promise<ISpecialty[]>;
  findByName(name: string): Promise<ISpecialty | undefined>;
}
