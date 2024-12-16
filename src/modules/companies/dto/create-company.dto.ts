import Joi from "joi";

export const createCompanySchema = Joi.object({
  ruc: Joi.string().required().messages({
    "string.empty": "RUC is required",
    "string.length": "RUC must be 11 characters long",
  }),
  business: Joi.string().required().messages({
    "string.empty": "Business name is required",
  }),
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  userWialon: Joi.string().required().messages({
    "string.empty": "Wialon username is required",
  }),
  passwordWialon: Joi.string().required().messages({
    "string.empty": "Wialon password is required",
  }),
  logoname: Joi.string().required().messages({
    "string.empty": "Logoname is required",
  }),
});
