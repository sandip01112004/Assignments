// src/middleware/errorHandler.js
const isProd = process.env.NODE_ENV === 'production';

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    message: err.message || 'Internal Server Error'
  };

  if (!isProd) {
    payload.stack = err.stack;
  }

  console.error(err); // log server-side
  res.status(status).json(payload);
}

module.exports = errorHandler;
