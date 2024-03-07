const express = require("express");
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler');
const { loadProducts } = require('./../controllers/products.controllers');
const { createProductSchema, updateProductSchema, getProductSchema, getProductNameSchema } = require('../db/schema/product.schema');
const router = express.Router();
const productService = new ProductsService();

router.post('/', productService.find);

    router.get('/filter', (req, res) => {
        res.send('Soy un filter');
    });
    
    router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    (req, res, next) => {
        const id = req.params.id;
        productService.findOne(req, res, next, {id});
    });

    router.get('/name/:productName',
    validatorHandler(getProductNameSchema, 'params'),
    async (req, res, next) => {
        const productName = req.params.productName;
        productService.findOne(req, res, next, { name: productName})
    });

    router.post('/generate',
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        const body = req.body;
        let result = {};
        if (body.autogenerate) {
            productService.generate(req, res, next);
        } else {
            result = await productService.create(body);
            res.status(201).json(result);
        }
    });

    router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const newProduct = await productService.update(id, body);
            res.json(newProduct);   
        } catch (error) {
            next(error);
        }
    });

    router.delete('/', productService.deleteAll);

    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deletedId = await productService.delete(id);
            res.json({id: deletedId});
        } catch (error) {
            next(error);
        }
    });

    router.post('/load', loadProducts);

    module.exports = router;
    