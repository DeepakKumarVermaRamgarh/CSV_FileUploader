const csvParser = require("csv-parser");
const File = require("../models/fileModel");
const fs = require("fs");
const path = require("path");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../middlewares/Error");

module.exports.upload = catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorHandler("No file choosen", 400));
  }

  if (req.file.mimetype != "text/csv") {
    return next(new ErrorHandler("Only CSV files allowed.", 400));
  }

  let file = await File.create({
    fileName: req.file.originalname,
    filePath: req.file.path,
    file: req.file.filename,
    fileSize: req.file.size,
  });

  return res.redirect("back");
});

module.exports.delete = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let file = await File.findOne({ file: id });
  if (!file)
    return next(new ErrorHandler(`File not exists with id : ${id}`, 404));

  await fs.unlinkSync(file.filePath);
  await File.deleteOne({ file: id });
  return res.redirect("back");
});

module.exports.preview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let file = await File.findOne({ file: id });
  if (!file) return next(new ErrorHandler("Invalid file id.", 404));

  const result = [];
  const header = [];

  fs.createReadStream(file.filePath, { encoding: "utf-8" })
    .on("error", () => {
      return next(
        new ErrorHandler(`File not found on path : ${file.filePath}`, 500)
      );
    })
    .pipe(csvParser())
    .on("headers", (headers) => {
      headers.map((head) =>
        header.push(head.charAt(0).toUpperCase() + head.slice(1))
      );
    })
    .on("data", (data) => result.push(data))
    .on("end", () => {
      res.render("preview_file", {
        title: `Preview | ${file.fileName}`,
        fileName: file.fileName,
        head: header,
        data: result,
      });
    });
});
