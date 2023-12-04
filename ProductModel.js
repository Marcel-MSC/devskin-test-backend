const Product = require('./product');

// Create a new product
const newProduct = new Product({
  name: 'Garrafa Termica',
  price: 50,
  description: 'Armazena líquidos quentes e frios'
});

newProduct.save()
  .then(() => console.log('Product created'))
  .catch((err) => console.log(err));

// Read all products
Product.find()
  .then((products) => console.log(products))
  .catch((err) => console.log(err));

// Update a product
Product.findOneAndUpdate({ name: 'Garrafa Termica' })
  .then(() => console.log('Product updated'))
  .catch((err) => console.log(err));

// Delete a product
Product.deleteOne({ name: 'Garrafa Termica' })
  .then(() => console.log('Product deleted'))
  .catch((err) => console.log(err));