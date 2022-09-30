const express = require("express");
const cors = require("cors");

const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const MongoConnect = require("./util/database").MongoConnect;
const User = require("./models/user");

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findById("6336a8c8756946f5de449193")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

MongoConnect(() => {
  app.listen(5000);
});
