const Product = require('../ProductSchema');
const assert = require('assert');

let product;
// this will run before running every test 
beforeEach(() => {
    // Creating a new Instance of Product Model 
    product = new Product({ name: 'garrafa', price: 10, description: 'teste' });
    product.save().then(() => done());
});

describe('Reading Details of Product', () => {
    it('Finds product with the name', (done) => {
        Product.findOne({ name: 'garrafa' })
            .then((product) => {
                assert(product.name === 'garrafa');
                done();
            });
    })
})
