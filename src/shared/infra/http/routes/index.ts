import { Router } from 'express';
import specialties from '@modules/specialties/infra/http/routes/specialties.routes';
import doctors from '@modules/doctors/infra/http/routes/doctors.routes';

const routes = Router();

routes.use('/doctors', doctors);
routes.use('/specialties', specialties);

export default routes;
