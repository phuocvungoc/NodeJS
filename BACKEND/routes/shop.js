const express = require("express");

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/cart", shopController.getCart);

router.get("/detail/:productId", shopController.getProduct);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

module.exports = router;
