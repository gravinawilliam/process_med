import { NOT_FOUND } from '@shared/constants/HttpStatusCode';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDeleteDoctorDTO from '../interfaces/dtos/IDeleteDoctorDTO';
import IDoctorsRepository from '../interfaces/repositories/IDoctorsRepository';

@injectable()
export default class DeleteDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({ doctorId }: IDeleteDoctorDTO): Promise<void> {
    const doctor = await this.doctorsRepository.findById(doctorId);
    if (!doctor) {
      throw new AppError('Doctor not found.', NOT_FOUND);
    }
    await this.doctorsRepository.delete(doctor.id);
  }
}
