import FakeDoctorsRepository from '@modules/doctors/fakes/FakeDoctorsRepository';
import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import SearchDoctorsService from '../SearchDoctorsService';

let fakeDoctorsRepository: FakeDoctorsRepository;
let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let searchDoctors: SearchDoctorsService;

describe('Search Doctors', () => {
  beforeEach(() => {
    fakeDoctorsRepository = new FakeDoctorsRepository();
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    searchDoctors = new SearchDoctorsService(fakeDoctorsRepository);
  });

  it('must be able to search doctors', async () => {
    const specialty1 = await fakeSpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialty2 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });

    await fakeDoctorsRepository.create({
      name: 'William',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
      specialties: [specialty1, specialty2],
    });

    await fakeDoctorsRepository.create({
      name: 'Billi',
      cellPhone: '(32) 99833-8851',
      cep: '36503-313',
      crm: '33.225.13',
      landline: '(32) 3532-2283',
      specialties: [specialty1, specialty2],
    });

    const doctors = await searchDoctors.execute({
      name: 'Billi',
    });

    expect(doctors[0].name).toBe('Billi');
  });
});
