const mongoose = require("mongoose");

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
  },
  {
    timestamps: {
      options: { timeZone: "Asia/Kolkata" },
    },
  }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;
