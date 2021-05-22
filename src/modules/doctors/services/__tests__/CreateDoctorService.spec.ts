import AppError from '@shared/errors/AppError';
import FakeDoctorsRepository from '@modules/doctors/fakes/FakeDoctorsRepository';
import CreateDoctorService from '../CreateDoctorService';

let fakeDoctorsRepository: FakeDoctorsRepository;
let createDoctor: CreateDoctorService;

describe('Create Doctor', () => {
  beforeEach(() => {
    fakeDoctorsRepository = new FakeDoctorsRepository();
    createDoctor = new CreateDoctorService(fakeDoctorsRepository);
  });

  it('must be able to create a new doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'William',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
    });
    expect(doctor).toHaveProperty('id');
  });

  it('should not be able to create a new doctor with the same cellphone', async () => {
    await fakeDoctorsRepository.create({
      name: 'William',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
    });

    await expect(
      createDoctor.execute({
        name: 'Will',
        cellPhone: '(32) 99833-8853',
        cep: '42332-311',
        crm: '33.534.12',
        landline: '(32) 3532-3123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
