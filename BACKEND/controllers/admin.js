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
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

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
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  Product.findById(prodId)
    .then((product) => {
      throw new Error("Dum");
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => res.send(result))
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.send(req.body);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};
