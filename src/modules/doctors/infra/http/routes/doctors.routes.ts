import { Router } from 'express';
import DoctorsController from '../controllers/DoctorsController';
import createDoctorValidator from '../validators/createDoctor';
import updateDoctorValidator from '../validators/updateDoctor';

const doctorsRouter = Router();
const doctors = new DoctorsController();

doctorsRouter.post('/', createDoctorValidator, doctors.create);

doctorsRouter.put('/:id', updateDoctorValidator, doctors.update);

export default doctorsRouter;
