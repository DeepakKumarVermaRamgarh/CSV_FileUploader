// Import the Mongoose module
const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect(
  "mongodb+srv://DEEPAK-KUMAR-VERMA:aGbIEyodIyQdNydU@deepak-verma.ckk1ejs.mongodb.net/csv_uploader"
);

// Get the database instance
const db = mongoose.connection;

// Handle errors
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

// Notify when the database is open
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

// Export the database instance
module.exports = db;
