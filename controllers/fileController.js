const csvParser = require("csv-parser"); // Module for parsing CSV files
const File = require("../models/fileModel"); // File model for interacting with the database
const fs = require("fs"); // File system module for working with files
const catchAsyncError = require("../middlewares/catchAsyncError"); // Middleware for catching and handling async errors
const ErrorHandler = require("../middlewares/Error"); // Custom error handler middleware

// Upload a file
module.exports.upload = catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("No file chosen", 400)); // Return an error if no file is chosen
  }

  if (req.file.mimetype != "text/csv") {
    return next(new ErrorHandler("Only CSV files allowed.", 400)); // Return an error if the file is not a CSV
  }

  // Create a new file record in the database
  let file = await File.create({
    fileName: req.file.originalname,
    filePath: req.file.path,
    file: req.file.filename,
    fileSize: req.file.size,
  });

  return res.redirect("back"); // Redirect back to the previous page
});

// Delete a file
module.exports.delete = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the file ID from the request parameters

  let file = await File.findOne({ file: id }); // Find the file record in the database
  if (!file) {
    return next(new ErrorHandler(`File does not exist with ID: ${id}`, 404)); // Return an error if the file is not found
  }

  await fs.unlinkSync(file.filePath); // Delete the file from the file system
  await File.deleteOne({ file: id }); // Delete the file record from the database

  return res.redirect("back"); // Redirect back to the previous page
});

// Preview a file
module.exports.preview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the file ID from the request parameters

  let file = await File.findOne({ file: id }); // Find the file record in the database
  if (!file) {
    return next(new ErrorHandler("Invalid file ID.", 404)); // Return an error if the file is not found
  }

  const result = []; // Array to store the parsed CSV data
  const header = []; // Array to store the CSV header row

  fs.createReadStream(file.filePath, { encoding: "utf-8" })
    .on("error", () => {
      return next(
        new ErrorHandler(`File not found at path: ${file.filePath}`, 500) // Return an error if the file is not found
      );
    })
    .pipe(csvParser()) // Pipe the file stream to the CSV parser
    .on("headers", (headers) => {
      headers.map((head) =>
        header.push(head.charAt(0).toUpperCase() + head.slice(1))
      ); // Capitalize the first letter of each header column
    })
    .on("data", (data) => result.push(data)) // Push each row of data to the result array
    .on("end", () => {
      res.render("preview_file", {
        title: `Preview | ${file.fileName}`,
        fileName: file.fileName,
        head: header,
        data: result,
      }); // Render the preview_file template with the file information and parsed data
    });
});
