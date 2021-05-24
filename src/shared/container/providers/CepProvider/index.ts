import { container } from 'tsyringe';
import CepPromisseCepProvider from './implementations/CepPromisseCepProvider';
import ICepProvider from './interfaces/ICepProvider';

container.registerSingleton<ICepProvider>(
  'CepProvider',
  CepPromisseCepProvider,
);
