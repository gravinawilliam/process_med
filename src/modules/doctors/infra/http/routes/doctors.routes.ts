import { Router } from 'express';
import DoctorsController from '../controllers/DoctorsController';
import createDoctorValidator from '../validators/createDoctor';
import deleteDoctorValidator from '../validators/deleteDoctor';
import searchDoctorsValidator from '../validators/searchDoctors';
import updateDoctorValidator from '../validators/updateDoctor';

const doctorsRouter = Router();
const doctors = new DoctorsController();

doctorsRouter.post('/', createDoctorValidator, doctors.create);

doctorsRouter.put('/:id', updateDoctorValidator, doctors.update);

doctorsRouter.delete('/:id', deleteDoctorValidator, doctors.delete);

doctorsRouter.get('/', searchDoctorsValidator, doctors.index);

export default doctorsRouter;
