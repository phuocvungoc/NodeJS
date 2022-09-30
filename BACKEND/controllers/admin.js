const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.prodId;
//   Product.destroy({ where: { id: prodId } })
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
//   // Product.findByPk(prodId)
//   //   .then((product) => {
//   //     product.destroy();
//   //   })
//   //   .then((result) => {
//   //     res.send(result);
//   //   })
//   //   .catch((err) => console.log(err));
// };
