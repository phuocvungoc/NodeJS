const Product = require("../models/product");

const { getErr500 } = require("../controllers/error");

const { validationResult } = require("express-validator");

exports.getProducts = (req, res, next) => {
  Product.find()
    //.select("title price -_id") // Quản lí trường nào được hiển thị
    //.populate("userId", "name") // Quản lí trường nào được điền thêm vào
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;

  if (!image) {
    return res.status(422).json("Attached file is not an image.");
  }

  const imageUrl = image.path;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if (image) {
        product.imageUrl = image.path;
      }
      return product.save();
    })
    .then((result) => res.send(result))
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      res.status(200).json("Success.");
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};
