import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().max(30).required(),
  surname: Joi.string().max(30).required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .pattern(/^\+?[0-9 ]{8,20}$/)
    .required(),

  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .required(),
});

export const loginValidator = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string().required(),
});

export const editProfileValidator = Joi.object({
  name: Joi.string().max(30).required(),
  surname: Joi.string().max(30).required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .pattern(/^\+?[0-9 ]{8,20}$/)
    .required(),
});
