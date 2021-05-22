import { Router } from 'express';
import specialties from '@modules/specialties/infra/http/routes/specialties.routes';

const routes = Router();

routes.use('/specialties', specialties);

export default routes;
