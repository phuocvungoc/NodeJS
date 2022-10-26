const express = require("express");

const authController = require("../controllers/auth");

const { validateLogin, validateSignup } = require("./../middleware/validate");

const router = express.Router();

router.post("/login", validateLogin, authController.postLogin);

router.post("/logout", authController.postLogout);

router.post("/signup", validateSignup, authController.postSignup);

module.exports = router;
