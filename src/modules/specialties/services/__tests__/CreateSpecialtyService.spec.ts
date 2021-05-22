import FakeSpecialtiesRepository from '@modules/specialties/fakes/FakeSpecialtiesRepository';
import CreateSpecialtyService from '../CreateSpecialtyService';

let fakeSpecialtiesRepository: FakeSpecialtiesRepository;
let createSpecialty: CreateSpecialtyService;

describe('Create Specialty', () => {
  beforeEach(() => {
    fakeSpecialtiesRepository = new FakeSpecialtiesRepository();
    createSpecialty = new CreateSpecialtyService(fakeSpecialtiesRepository);
  });

  it('must be able to create a new specialty', async () => {
    const specialty = await createSpecialty.execute({
      name: 'Alergologia',
    });
    expect(specialty).toHaveProperty('id');
  });
});
