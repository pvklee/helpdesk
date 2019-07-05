const Validator = require('validator');
const validText = require('./valid-text');

exports.validateSignup = (data) => {
  let errors = {};
  
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if(!Validator.isLength(data.email, { min: 2, max: 30 })){
    errors.email = 'Email must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email must not be empty';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

exports.validateLogin = (data) => {
  let errors = {};
  
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email must not be empty';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

const validateUserId = (data) => {
  let errors = {};
  
  data.userId = data.userId !== undefined ? data.userId : '';
  if (!Validator.isInt(data.userId, {min: 0})) {
    errors.userId = 'Valid userId greater than 0 is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}