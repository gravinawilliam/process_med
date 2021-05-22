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
      name: 'Alergologia',
      cellPhone: '(32) 99833-8853',
      cep: '36503-312',
      crm: '33.225.11',
      landline: '(32) 3532-2280',
    });
    expect(doctor).toHaveProperty('id');
  });
});
