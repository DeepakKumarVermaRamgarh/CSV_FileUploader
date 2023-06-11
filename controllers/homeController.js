const File = require("../models/fileModel"); // File model for interacting with the database
const catchAsyncError = require("../middlewares/catchAsyncError"); // Middleware for catching and handling async errors

// Home route handler
module.exports.home = catchAsyncError(async (req, res, next) => {
  let files = await File.find({}); // Fetch all files from the database

  // Render the home template with the files and title
  return res.render("home", {
    files,
    title: "CSV Uploader | Home",
  });
});
