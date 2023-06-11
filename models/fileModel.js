const mongoose = require("mongoose"); // Importing the mongoose library

// Defining the file schema using mongoose.Schema
const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
    },
  },
  {
    timestamps: {
      options: { timeZone: "Asia/Kolkata" }, // Setting the timezone for the timestamps
    },
  }
);

const File = mongoose.model("File", fileSchema); // Creating a model based on the file schema
module.exports = File; // Exporting the File model for use in other parts of the application
