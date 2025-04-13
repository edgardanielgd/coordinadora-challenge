import Joi from 'joi';

export const createUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),

    document: Joi.string().alphanum().min(5).max(20).required(),

    documentType: Joi.string()
    .valid('CC', 'TI', 'PE')
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // at least one lowercase, one uppercase, one digit
    .required(),

    email: Joi.string().email().required(),

    status: Joi.string()
    .valid('ACTIVE', 'INACTIVE')
    .required(),

    firstName: Joi.string().min(1).max(50).required(),

    secondName: Joi.string().allow('').max(50),

    firstSurname: Joi.string().min(1).max(50).required(),

    secondSurname: Joi.string().allow('').max(50),

    roles: Joi.array().items(
        Joi.string().allow("ADMIN", 'USER')
    )
})