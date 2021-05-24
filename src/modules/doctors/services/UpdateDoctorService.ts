import ISpecialtiesRepository from '@modules/specialties/interfaces/repositories/ISpecialtiesRepository';
import { CONFLICT, NOT_FOUND } from '@shared/constants/HttpStatusCode';
import IAddressDTO from '@shared/container/providers/CepProvider/interfaces/dtos/IAddressDTO';
import ICepProvider from '@shared/container/providers/CepProvider/interfaces/ICepProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateDoctorDTO from '../interfaces/dtos/IUpdateDoctorDTO';
import IDoctor from '../interfaces/models/IDoctor';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class UpdateDoctorService {
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
    doctorId,
  }: IUpdateDoctorDTO): Promise<IDoctor> {
    const doctor = await this.doctorsRepository.findById(doctorId);

    if (!doctor) {
      throw new AppError('Doctor not found.', NOT_FOUND);
    }

    if (specialtiesIds) {
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
      doctor.specialties = specialties;
    }

    if (cellPhone) {
      const cellPhoneExists = await this.doctorsRepository.findByCellPhone(
        cellPhone,
      );
      if (cellPhoneExists && doctor.id !== cellPhoneExists.id) {
        throw new AppError('CellPhone name already exists.', CONFLICT);
      }
      doctor.cellPhone = cellPhone;
    }

    if (crm) {
      const crmExists = await this.doctorsRepository.findByCrm(crm);
      if (crmExists && doctor.id !== crmExists.id) {
        throw new AppError('CRM name already exists.', CONFLICT);
      }
      doctor.crm = crm;
    }

    if (name) {
      doctor.name = name;
    }

    if (cep) {
      let address: IAddressDTO;
      try {
        address = await this.cepProvider.getAddress(cep);
      } catch (error) {
        throw new AppError('CEP not found.', NOT_FOUND);
      }
      doctor.cep = cep;
      doctor.state = address.state;
      doctor.city = address.city;
      doctor.neighborhood = address.neighborhood;
      doctor.street = address.street;
    }

    if (landline) {
      doctor.landline = landline;
    }

    await this.doctorsRepository.save(doctor);

    return doctor;
  }
}
