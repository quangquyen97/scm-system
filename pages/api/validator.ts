import Joi from "joi";
const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema: any = Joi.object({
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string()
    .min(6)
    .max(16)
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/))
    .required(),
  userRole: Joi.string().required(),
  userName: Joi.string().required(),
  id: Joi.number(),
});

const signinShema: any = Joi.object({
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().required(),
});
export const validateSignup = validator(signupSchema);
export const validateSignin = validator(signinShema);
