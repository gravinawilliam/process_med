import { Router } from 'express';
import SpecialtiesController from '../controllers/SpecialtiesController';
import createSpecialtyValidator from '../validators/createSpecialty';

const specialtiesRouter = Router();
const specialties = new SpecialtiesController();

specialtiesRouter.post('/', createSpecialtyValidator, specialties.create);

export default specialtiesRouter;
