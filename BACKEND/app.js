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
  User.findById("6338f1761eea501e8b755d9a")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

MongoConnect(() => {
  app.listen(5000);
});
