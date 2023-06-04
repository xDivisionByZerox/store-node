const faker = require('faker');
const boom = require('@hapi/boom');
const PRODUCT_NOT_FOUND = 'Product Not Found';

class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
    
    for (let index = 0; index < limit; index++) {
        const product = {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
            isBlocked: faker.datatype.boolean()
        };
        this.products.push(product);
    }
    
    }

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }


    async find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 3000);
        });
    }


    async findOne(param, value) {
        const product = this.products.find(item => item[param] == value);
        if (!product) {
            throw boom.notFound(PRODUCT_NOT_FOUND);
        }

        if (product.isBlocked) {
            throw boom.conflict('Product is Blocked');
        }
        
        return product; 
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

}

module.exports = ProductsService;