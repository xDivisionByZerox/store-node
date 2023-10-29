const Joi = require('joi');
const Mongoose = require('mongoose');

const ProductDBSchema = Mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
      type: String
    },
    price: {
        type: Mongoose.Schema.Types.Number
    },
    image: {
        type: String,
        min: 5
    },
    isBlocked:{
        type: Boolean
    }
});

const ProductDB = Mongoose.model('product', ProductDBSchema);

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const image = Joi.string().min(5);
const isBlocked = Joi.boolean();
const autogenerate = Joi.boolean();

const createProductSchema = Joi.object({
    autogenerate: autogenerate.valid(true, false, ""),
    name: Joi.alternatives().conditional('autogenerate', { is: false, then: name.required() }),
    price: Joi.alternatives().conditional('autogenerate', { is: false, then: price.required() }),
    image: Joi.alternatives().conditional('autogenerate', { is: false, then: image.required() }),
    isBlocked: Joi.alternatives().conditional('autogenerate', { is: false, then: isBlocked.required() })
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

module.exports = { ProductDB, createProductSchema, updateProductSchema, getProductSchema, getProductNameSchema };
