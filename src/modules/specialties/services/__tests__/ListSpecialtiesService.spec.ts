import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import ListSpecialtiesService from '../ListSpecialtiesService';

let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let listSpecialties: ListSpecialtiesService;

describe('List Specialties', () => {
  beforeEach(() => {
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    listSpecialties = new ListSpecialtiesService(fakeSpecialtiesRepository);
  });

  it('must be able to list specialties', async () => {
    const specialty1 = await fakeSpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialty2 = await fakeSpecialtiesRepository.create({
      name: 'Angiologia',
    });
    const specialty3 = await fakeSpecialtiesRepository.create({
      name: 'Cirurgia cabeça e pescoço',
    });
    const specialties = await listSpecialties.execute();
    expect(specialties).toEqual([specialty1, specialty2, specialty3]);
  });
});
