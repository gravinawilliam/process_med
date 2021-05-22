import { Router } from 'express';
import DoctorsController from '../controllers/DoctorsController';
import createDoctorValidator from '../validators/createDoctor';

const doctorsRouter = Router();
const doctors = new DoctorsController();

doctorsRouter.post('/', createDoctorValidator, doctors.create);

export default doctorsRouter;
