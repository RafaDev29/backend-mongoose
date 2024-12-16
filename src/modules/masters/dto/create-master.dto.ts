import Joi from "joi";

export const createMasterSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  business: Joi.string().required().messages({
    "string.empty": "Business name is required",
    "any.required": "Business name is required",
  }),
  ruc: Joi.string().required().messages({
    "string.empty": "RUC is required",
    "any.required": "RUC is required",
    "string.length": "RUC must be 11 characters long",
  }),
});
