const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
// const csrf = require("csurf");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const User = require("./models/user");
const errorController = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://phuocvungoc:phuocvungoc997@cluster0.ruh6ryi.mongodb.net/shop?w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
// const csrfProtection = csrf();

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/api/admin", adminRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/auth", authRoutes);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(error.httpStatusCode || 500).json(error.message);
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
