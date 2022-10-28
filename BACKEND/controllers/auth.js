const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

const { getErr500 } = require("../controllers/error");

const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "phuocdaika3334@gmail.com",
    pass: "uezlggsgjzygkfgb",
  },
});

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json("Sign up successfully");
      return transporter.sendMail({
        from: "phuocdaika3334@gmail.com",
        to: email,
        subject: "Signup succeeded!",
        html: "<h1>You successfully signed up</h1>",
      });
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(500).json("Invalid email or password");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              res.cookie("isLoggedIn", true).status(200).send(user);
            });
          } else {
            return res.status(500).json("Invalid email or password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      return next(getErr500(err));
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.cookie("isLoggedIn", false).status(200).send("ok");
  });
};
