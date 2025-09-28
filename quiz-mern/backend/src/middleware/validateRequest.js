// src/middleware/validateRequest.js
const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return first error(s) in a tidy format
    return res.status(400).json({
      errors: errors.array().map(e => ({
        field: e.param,
        msg: e.msg,
        value: e.value
      }))
    });
  }
  next();
}

module.exports = validateRequest;
