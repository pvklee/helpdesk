const Validator = require('validator');
const validText = require('./valid-text');

const validateCreateMessage = (data) => {
  let errors = {};
  
  data.body = validText(data.body) ? data.body : '';
  data.recipientId = data.recipientId !== undefined ? data.recipientId : '';
  if(Validator.isEmpty(data.body)){
    errors.body = 'Message must contain text';
  }

  if (!Validator.isInt(data.recipientId, {min: 0})) {
    errors.recipientId = 'Valid recipientId greater than 0 is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = {
  validateCreateMessage
}