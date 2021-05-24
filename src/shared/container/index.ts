import { container } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/interfaces/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';
import SpecialtiesRepository from '@modules/specialties/infra/typeorm/repositories/SpecialtiesRepository';
import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';
import './providers';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<ISpecialtiesRepository>(
  'SpecialtiesRepository',
  SpecialtiesRepository,
);
