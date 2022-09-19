const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.send(products);
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.json(req.body);
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params;
  Product.findById(prodId, (product) => {
    res.send(product);
  });
};
