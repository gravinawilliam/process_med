import { celebrate, Joi, Segments } from 'celebrate';

const updateDoctorValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    name: Joi.string(),
    cellPhone: Joi.string().regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
    cep: Joi.string().regex(/^\d{5}-\d{3}$/),
    crm: Joi.string().regex(/^\d{2}.\d{3}.\d{2}$/),
    landline: Joi.string().regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
    specialtiesIds: Joi.array().min(2),
  },
});

export default updateDoctorValidator;
