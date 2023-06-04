const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const image = Joi.string().min(5);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

const updateProductSchema = Joi.object({
    name,
    price
});

const getProductSchema = Joi.object({
    id: id.required()
});

const getProductNameSchema = Joi.object({
    productName: name.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, getProductNameSchema };
