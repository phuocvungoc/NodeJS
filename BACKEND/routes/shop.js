const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

// router.get("/cart", shopController.getCart);

router.get("/detail/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/create-order", shopController.postOrder);

router.get("/orders", shopController.getOrders);

module.exports = router;
