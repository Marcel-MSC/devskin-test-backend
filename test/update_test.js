const Product = require('../ProductSchema');
const assert = require('assert');

describe('Updateing document in MongoDB', async () => {
    it('Update product by id', (done) => {
        let product;
        beforeEach((done) => {
            product = new Product({ name: 'garrafa', price: 10, description: 'testee' });
            product.save()
                .then(() => done());
        });
        // Handling Redundant Code 
        function helperFunc(assertion, done) {
            assertion
                .then(() => Product.find({ _id: product._id }))
                .then((products) => {
                    assert(products.length === 1);
                    assert(products[0].name === 'Updated garrafa');
                    done();
                });
        }

        it('Sets and saves a product using an instance', (done) => {
            // Not yet updated in MongoDb 
            product.set('name', 'Updated garrafaa');
            helperFunc(product.save(), done);
        });

        it('Update a product using instance', (done) => {
            helperFunc(product.update({ name: 'Updated garrafa' }), done);
        });
        done()
    })
});