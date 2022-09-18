const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;
