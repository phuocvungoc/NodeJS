const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.send(cartProducts);
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.json(req.body);
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.json(res.body);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then((products) => res.send(products[0]))
  //   .catch((err) => console.log(err));
  Product.findByPk(prodId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
};
