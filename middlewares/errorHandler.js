const CustomError = require('../utils/CustomError');

module.exports = function (err, req, res, next) {
  err.message = err.message || 'Something went wrong  | Internal Server Error';
  err.status = err.status || 500;

  // Handling the Error In Development MODE
  //////////////////////////////////////////////////////////////
  const handleErrDev = (err, res) => {
    return res.status(err.status).json({
      status: 'failed',
      message: err.message,
      stack: err.stack,
      err: err,
    });
  };

  // Handling the Error In Production Mode
  //////////////////////////////////////////////////////////////
  const handleErrProd = (err, res) => {
    // Operational Error, Trusted Error: Send to Client
    if (err.isOperational) {
      return res
        .status(err.statusCode)
        .json({ status: 'failed', message: err.message });

      // Other Unknown Errors | Don't Leak the important data to the client
    } else {
      // 1)   Logging Error
      // console.log('ERROR 🔥🔥 ', err);

      // 2) Send a very simple Error Message
      res.status(500).json({
        status: 'failed',
        message: 'Something went wrong | Internal Server Error',
      });
    }
  };
  // (a) Handling a Validation Error
  const handleValidationError = error => {
    return new CustomError(error.message, 400);
  };

  // (b) Hanlding a Duplicate key Error
  const duplicateKeyError = error => {
    return new CustomError(
      `${
        Object.keys(error.keyValue)[0]
      } should be unique  | Please Use Another One`,
      400
    );
  };

  // (c) Handling CAST errors
  const castError = err => {
    return new CustomError(`Invalid ${err.path}: ${err.value}`, 400);
  };

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Checking for Validation Error
    if (err.name === 'ValidationError') error = handleValidationError(error);

    // Checking for Duplication Errors
    if (err.code === 11000) error = duplicateKeyError(error);

    // Checking for CastErrors
    if (err.name === 'CastError') error = castError(error);

    handleErrProd(error, res);
  } else if (process.env.NODE_ENV === 'development') {
    handleErrDev(err, res);
  }
};
