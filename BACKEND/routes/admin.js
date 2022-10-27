const express = require("express");

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

const { validateAddProduct } = require("../middleware/validate");

const router = express.Router();

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post(
  "/add-product",
  isAuth,
  validateAddProduct,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  validateAddProduct,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
