const Joi = require('joi');


const password = Joi.string().min(6);
const username = Joi.string().required();
const name = Joi.string();

loginSchema = Joi.object({
    username,
    password: password.required()
});

registerSchema = Joi.object({
    username,
    password: password.required(),
    name,
});

module.exports = { loginSchema, registerSchema };
