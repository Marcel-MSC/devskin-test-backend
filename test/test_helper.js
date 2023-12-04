
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0';
mongoose.connect(MONGODB_URI);

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
        done()
    });

// runs before each test 
beforeEach((done) => {
    done();
    mongoose.connection.collections.product.drop(() => {
        done();
    });
});
