const express = require("express");
const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');
const router = express.Router();
const productService = new ProductsService();

router.get('/', async (req, res) => {
    const products = await productService.find();
        res.json(products);
    });
    
    router.get('/filter', (req, res) => {
        res.send('Soy un filter');
    });
    
    router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {    
            const id = req.params.id;
            const product = await productService.findOne(id);
        
            res.json(product);
        } catch (error) {
            next(error);
        }
    });

    router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await productService.create(body);
        res.status(201).json(newProduct);
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

    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deletedId = await productService.delete(id);
            res.json({id: deletedId});
        } catch (error) {
            next(error);
        }
    });

    module.exports = router;
    