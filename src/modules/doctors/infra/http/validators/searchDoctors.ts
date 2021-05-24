import { celebrate, Joi, Segments } from 'celebrate';

const searchDoctorsValidator = celebrate({
  [Segments.QUERY]: {
    name: Joi.string().required(),
    cellPhone: Joi.string()
      .required()
      .regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
    cep: Joi.string()
      .required()
      .regex(/^\d{5}-\d{3}$/),
    crm: Joi.string()
      .required()
      .regex(/^\d{2}.\d{3}.\d{2}$/),

    landline: Joi.string()
      .required()
      .regex(/^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/),
  },
});

export default searchDoctorsValidator;