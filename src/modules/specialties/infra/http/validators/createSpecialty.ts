import { celebrate, Joi, Segments } from 'celebrate';

const createSpecialtyValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

export default createSpecialtyValidator;
