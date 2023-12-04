const express = require('express');
const Product = require('./ProductSchema');
let ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

// Create a new product
router.post('/createproduct', async (req, res) => {
  const { name, price, description } = req.body;
  let productExist = [];
  try {
    productExist = await Product.find({ name: name });
    if (productExist.length == 0) {
      const product = new Product({ name, price, description });
      await product.save();
      res.send(product);
    } else {
      res.send('registered product');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all products that are equal or higher than the price passa as param
router.get('/productsbyprice/:price', async (req, res) => {
  const { price } = req.params;
  const priceNumber = Number(price);
  try {
    const product = await Product.find({ price: { $gte: priceNumber } });
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

// Get all products that match the keyword pass as param
router.get('/productsbydescription/:keyword', async (req, res) => {
  const { keyword } = req.params;
  try {
    const product = await Product.find({ description: { $regex: keyword, $options: 'i' } });
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

// Get all products
router.get('/getallproducts', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a product
router.put('/updateproducts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a product
router.delete('/deleteproduct/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      res.send('invalid id');
    } else if (ObjectId.isValid(id)) {
      let findProduct = await Product.find({ _id: id });
      if (findProduct.length > 0) {
        const product = await Product.findByIdAndDelete(id);
        res.send(product);
      } else {
        res.send('product not find');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;