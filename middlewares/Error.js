// Custom error handler class that extends the built-in Error class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the constructor of the Error class and pass the error message

    this.statusCode = statusCode; // Set the status code property of the error object
  }
}

module.exports = ErrorHandler; // Export the ErrorHandler class for use in other parts of the application
