const faker = require('faker');
const boom = require('@hapi/boom');
const PRODUCT_NOT_FOUND = 'Product Not Found';
const {ProductDB, createProductSchema} = require("./../db/schema/product.schema");

class ProductsService {

    constructor() {
        this.products = [];
        //this.generate();
    }

    async generate(req, res, next) {
        const limit = 100;
    const prods = [];
    try {
        for (let index = 0; index < limit; index++) {
            const product = {
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: 'https://picsum.photos/200/300',
                isBlocked: faker.datatype.boolean()
            };
            prods.push(product);
        }
        const createProds = await ProductDB.insertMany(prods);
        this.products = createProds;

        res.status(200).json({
            message: 'products generated',
            products: createProds
        });
    } catch (err) {
        next(err);
    }
    };

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }


    async find(req, res, next) {
        try {
            const products = await ProductDB.find({});
            res.status(200).json(products);
        } catch(err) {
            next(err);
        }
    }


    findOne = async(req, res, next, query) => {
        try {
            const product = await ProductDB.findOne(query);

            if (!product) {
                throw boom.notFound(PRODUCT_NOT_FOUND);
            }
    
            if (product.isBlocked) {
                throw boom.conflict('Product is Blocked');
            }
            
            res.status(200).json(product);
        } catch(err) {
            next(err);
        }
    }

    async update(id, newProductData) {
        const index = this.products.findIndex(item => item.id == id);

        if (index === -1) {
            throw boom.notFound(PRODUCT_NOT_FOUND);
        }

        const currentProduct = this.products[index];
        this.products[index] = {
            ...currentProduct,
            ...newProductData
        };

        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id == id);
        if (index === -1) {
            throw boom.notFound(PRODUCT_NOT_FOUND);
        }

        this.products.splice(index, 1);
        return id;
    }

    deleteAll = async(req, res, next) => {
        try {
            const deletedIds = await ProductDB.deleteMany({});
            res.status(201).json(deletedIds);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = ProductsService;