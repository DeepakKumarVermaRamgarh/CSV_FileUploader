const File = require("../models/fileModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../middlewares/Error");

module.exports.home = catchAsyncError(async (req, res, next) => {
  let files = await File.find({});
  return res.render("home", {
    files,
    title: "CSV Uploader | Home",
  });
});
