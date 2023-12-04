const Product = require('../ProductSchema');
const assert = require('assert');

describe('Creating documents in MongoDB', async () => {
    it('Creates a New Product', (done) => {
        const product = new Product({ name: 'garrafa test', price: 10, description: 'testee' });
        product.save() // returns a promise after some time 
            .then(() => {
                //if the product is saved in db and it is not new 
                assert(!product.isNew);
                //console.log('Product created: ', product)
                done();
            });
    })
});

