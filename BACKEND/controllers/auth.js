const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (user.password === password) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          res.cookie("isLoggedIn", true).status(200).send(user);
        });
      } else res.status(500).json("Login fail");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.cookie("isLoggedIn", false).status(200).send("ok");
  });
};
