const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(req, res, next) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";

  // Email checks
  if (Validator.isEmpty(req.body.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(req.body.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(req.body.password)) {
    errors.password = "Password field is required";
  }

  if (!isEmpty(errors)){
    res.status(400).json({
      errors,
      isValid: isEmpty(errors)
    });
  } else {
    next()
  }
};
