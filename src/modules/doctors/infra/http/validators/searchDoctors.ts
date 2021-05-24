import { celebrate, Joi, Segments } from 'celebrate';

const searchDoctorsValidator = celebrate({
  [Segments.QUERY]: {
    name: Joi.string(),
    cellPhone: Joi.string().regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
    cep: Joi.string().regex(/^\d{5}-\d{3}$/),
    crm: Joi.string().regex(/^\d{2}.\d{3}.\d{2}$/),

    landline: Joi.string().regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
    city: Joi.string(),
    neighborhood: Joi.string(),
    state: Joi.string(),
    street: Joi.string(),
  },
});

export default searchDoctorsValidator;
