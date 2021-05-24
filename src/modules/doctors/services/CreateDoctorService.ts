import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';
import { CONFLICT, NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IAddressDTO from '@shared/container/providers/CepProvider/interfaces/dtos/IAddressDTO';
import ICepProvider from '@shared/container/providers/CepProvider/interfaces/ICepProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRequestCreateDoctorDTO from '../interfaces/dtos/IRequestCreateDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('SpecialtiesRepository')
    private specialtiesRepository: ISpecialtiesRepository,
    @inject('CepProvider')
    private cepProvider: ICepProvider,
  ) {}

  public async execute({
    name,
    cellPhone,
    cep,
    crm,
    landline,
    specialtiesIds,
  }: IRequestCreateDoctorDTO): Promise<IDoctor> {
    const newSpecialtiesIds = specialtiesIds.filter(
      (specialty, i) => specialtiesIds.indexOf(specialty) === i,
    );

    const specialties = await this.specialtiesRepository.findByIds(
      newSpecialtiesIds,
    );

    if (specialties.length < 2) {
      throw new AppError(
        'You need to report two or more specialties',
        NOT_FOUND,
      );
    }

    const cellPhoneExists = await this.doctorsRepository.findByCellPhone(
      cellPhone,
    );
    if (cellPhoneExists) {
      throw new AppError('CellPhone name already exists.', CONFLICT);
    }

    const crmExists = await this.doctorsRepository.findByCrm(crm);
    if (crmExists) {
      throw new AppError('CRM name already exists.', CONFLICT);
    }
    let address: IAddressDTO;

    try {
      address = await this.cepProvider.getAddress(cep);
    } catch (error) {
      throw new AppError('CEP not found.', NOT_FOUND);
    }

    const doctor = await this.doctorsRepository.create({
      name,
      cellPhone,
      cep,
      crm,
      landline,
      specialties,
      city: address.city,
      neighborhood: address.neighborhood,
      state: address.state,
      street: address.street,
    });

    return doctor;
  }
}
