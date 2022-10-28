exports.get404 = (req, res, next) => {
  res.status(404).json("404 Page Not Found");
};

exports.getErr500 = (err) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  error.message = err.message;
  return error;
};
