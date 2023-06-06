const Joi = require('joi');


const password = Joi.string().min(6);
const username = Joi.string();

loginSchema = Joi.object({
    username: username.required(),
    password: password.required()
});

module.exports = { loginSchema };
