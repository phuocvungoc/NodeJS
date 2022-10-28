const express = require("express");
// const multer = require("multer");

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

const { validateAddProduct } = require("../middleware/validate");

const fileUploader = require("../configs/cloudinary.config");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, "test-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
//   "image"
// );

// /admin/products => GET
router.get("/products", adminController.getProducts);

router.post(
  "/add-product",
  isAuth,
  fileUploader.single("image"),
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
