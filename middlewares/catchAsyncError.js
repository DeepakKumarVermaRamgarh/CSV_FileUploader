// Middleware function for catching and handling async errors
const catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
};

module.exports = catchAsyncError;
