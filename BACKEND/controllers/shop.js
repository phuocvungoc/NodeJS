const Product = require("../models/product");
const Order = require("../models/order");

const { getErr500 } = require("../controllers/error");

exports.getCart = async (req, res, next) => {
  await req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.send(products);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postOrder = async (req, res, next) => {
  await req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: { email: req.user.email, userId: req.user },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      req.user.clearCart();
      res.send(result);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};
