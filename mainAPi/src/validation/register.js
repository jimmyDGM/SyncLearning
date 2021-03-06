const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(req, res, next) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  req.body.name = !isEmpty(req.body.name) ? req.body.name : "";
  req.body.email = !isEmpty(req.body.email) ? req.body.email : "";
  req.body.password = !isEmpty(req.body.password) ? req.body.password : "";
  req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : "";

  // Name checks
  if (Validator.isEmpty(req.body.name)) {
    errors.name = "Name field is required";
  }

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

  if (Validator.isEmpty(req.body.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(req.body.password, req.body.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!req.file) {
    errors.picture = "This field is required"
  }

  if (!isEmpty(errors)){
    res.status(400).json({errors, isValid: isEmpty(errors)})
  }
  else {
    next()
  }
};
