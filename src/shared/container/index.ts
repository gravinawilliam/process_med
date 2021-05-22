import { container } from 'tsyringe';
import SpecialtiesRepository from '@modules/specialties/infra/typeorm/repositories/SpecialtiesRepository';
import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);
