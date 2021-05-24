import { inject, injectable } from 'tsyringe';
import ISearchDoctorDTO from '../interfaces/dtos/ISearchDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class SearchDoctorsService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    name,
    cellPhone,
    cep,
    crm,
    landline,
    city,
    neighborhood,
    state,
    street,
  }: ISearchDoctorDTO): Promise<IDoctor[]> {
    const doctors = await this.doctorsRepository.findDoctors({
      cellPhone,
      cep,
      crm,
      landline,
      name,
      city,
      neighborhood,
      state,
      street,
    });
    return doctors;
  }
}
