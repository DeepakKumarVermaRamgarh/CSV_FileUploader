// Error middleware function for handling errors
const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Set the status code of the error, default to 500 if not provided
  err.message = err.message || "Internal Server Error"; // Set the error message, default to "Internal Server Error" if not provided

  res.status(err.statusCode).send(err.message); // Set the response status code and send the error message
};

module.exports = ErrorMiddleware; // Export the ErrorMiddleware function for use in other parts of the application
