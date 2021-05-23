import AppError from '@shared/errors/AppError';
import FakeDoctorsRepository from '@modules/doctors/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import CreateDoctorService from '../CreateDoctorService';

let fakeDoctorsRepository: FakeDoctorsRepository;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let createDoctor: CreateDoctorService;

describe('Create Doctor', () => {
  beforeEach(() => {
    fakeDoctorsRepository = new FakeDoctorsRepository();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    createDoctor = new CreateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialtiesRepository,
    );
  });

  it('must be able to create a new doctor', async () => {
    const doctor = await createDoctor.execute({
      name: 'William',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
      specialtiesIds: [],
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
      specialties: [],
    });

    await expect(
      createDoctor.execute({
        name: 'Will',
        cellPhone: '(32) 99833-8853',
        cep: '42332-311',
        crm: '33.534.12',
        landline: '(32) 3532-3123',
        specialtiesIds: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new doctor with the same CRM', async () => {
    await fakeDoctorsRepository.create({
      name: 'William',
      cellPhone: '(32) 99833-8851',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
      specialties: [],
    });

    await expect(
      createDoctor.execute({
        name: 'Will',
        cellPhone: '(32) 99833-8853',
        cep: '42332-311',
        crm: '33.225.11',
        landline: '(32) 3532-3123',
        specialtiesIds: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
