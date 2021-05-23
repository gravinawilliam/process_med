import FakeDoctorsRepository from '@modules/doctors/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import DeleteDoctorService from '../DeleteDoctorService';

let fakeDoctorsRepository: FakeDoctorsRepository;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let deleteDoctor: DeleteDoctorService;

describe('Delete Doctor', () => {
  beforeEach(() => {
    fakeDoctorsRepository = new FakeDoctorsRepository();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    deleteDoctor = new DeleteDoctorService(fakeDoctorsRepository);
  });

  it('must be able to delete a doctor', async () => {
    const specialty1 = await fakeSpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialty2 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });

    const doctor = await fakeDoctorsRepository.create({
      name: 'William',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
      specialties: [specialty1, specialty2],
    });

    const updatedDoctor = await deleteDoctor.execute({
      doctorId: doctor.id,
    });

    expect(updatedDoctor);
  });

  it('should not be able to delete a doctor with an invalid id', async () => {
    await expect(
      deleteDoctor.execute({
        doctorId: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
