
import Joi from "joi";


export const loginSchema = Joi.object({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[1-9]')).required()
    },
    params: {},
    query: {}
})

export const registerSchema = Joi.object({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[1-9]')).required(),
        userName: Joi.string().min(2).max(100).required(),
    },
    params: {},
    query: {},

})
export const firstLoginSchema = Joi.object({
    body: {
        email: Joi.string().email().required(),
        otp: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'otp must be exactly 6 digits.',
            }),
    },
    params: {},
    query: {},

})