import { celebrate, Joi, Segments } from 'celebrate';

const deleteDoctorValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export default deleteDoctorValidator;
