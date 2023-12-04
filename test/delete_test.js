const Product = require('../ProductSchema');
const assert = require('assert');

describe('Deleting document in MongoDB', async () => {
    it('Delete product by id', (done) => {

        let product;
        beforeEach((done) => {
            product = new Product({ name: 'garrafa', price: 10, description: 'testee' });
            product.save()
                .then(() => done());
        });

        it('Removes a product using its instance', (done) => {
            Product.remove()
                // Checking if the product was deleted from DB or not 
                .then(() => Product.findOne({ name: 'garrafa' }))
                .then((product) => {
                    assert(product === null);
                    done();
                });
        });

        it('Removes a product', (done) => {
            Product.findOneAndRemove({ name: 'garrafa' })
                .then(() => Product.findOne({ name: 'garrafa' }))
                .then((product) => {
                    assert(product === null);
                    done();
                });
        });

        it('Removes a product using its id', (done) => {
            Product.findIdAndRemove(product._id)
                .then(() => Product.findOne({ name: 'garrafa' }))
                .then((product) => {
                    assert(product === null);
                    done();
                });
        })

        done();
    })
});