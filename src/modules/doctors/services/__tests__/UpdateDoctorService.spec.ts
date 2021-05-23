import FakeDoctorsRepository from '@modules/doctors/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import UpdateDoctorService from '../UpdateDoctorService';

let fakeDoctorsRepository: FakeDoctorsRepository;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let updateDoctor: UpdateDoctorService;

describe('Update Doctor', () => {
  beforeEach(() => {
    fakeDoctorsRepository = new FakeDoctorsRepository();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    updateDoctor = new UpdateDoctorService(
      fakeDoctorsRepository,
      fakeSpecialtiesRepository,
    );
  });

  it('must be able to update a doctor', async () => {
    const specialty1 = await fakeSpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialty2 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });
    const specialty3 = await fakeSpecialtiesRepository.create({
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

    const updatedDoctor = await updateDoctor.execute({
      doctorId: doctor.id,
      name: 'Will',
      cellPhone: '(32) 99833-8855',
      cep: '36503-311',
      crm: '33.225.12',
      landline: '(32) 3532-2281',
      specialtiesIds: [specialty1.id, specialty2.id, specialty3.id],
    });
    expect(updatedDoctor.name).toBe('Will');
    expect(updatedDoctor.cellPhone).toBe('(32) 99833-8855');
    expect(updatedDoctor.cep).toBe('36503-311');
    expect(updatedDoctor.crm).toBe('33.225.12');
    expect(updatedDoctor.landline).toBe('(32) 3532-2281');
    expect(updatedDoctor.specialties).toStrictEqual([
      specialty1,
      specialty2,
      specialty3,
    ]);
  });

  it('should not be able to update a doctor with an invalid doctorId', async () => {
    const specialty1 = await fakeSpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialty2 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });
    const specialty3 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });

    await expect(
      updateDoctor.execute({
        doctorId: 'invalid id',
        name: 'Will',
        cellPhone: '(32) 99833-8855',
        cep: '36503-311',
        crm: '33.225.12',
        landline: '(32) 3532-2281',
        specialtiesIds: [specialty1.id, specialty2.id, specialty3.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
