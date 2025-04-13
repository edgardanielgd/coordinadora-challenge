import Joi from 'joi';

export const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().min(3).max(30).required(),

    password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // at least one lowercase, one uppercase, one digit
    .required(),

})