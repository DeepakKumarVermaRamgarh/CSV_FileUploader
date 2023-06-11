const express = require("express"); // Importing the express library
const router = express.Router(); // Creating a new router object from express

const multer = require("multer"); // Importing the multer library for file uploads

const homeController = require("../controllers/homeController"); // Importing the home controller
const fileController = require("../controllers/fileController"); // Importing the file controller

const uploadFile = multer({ dest: "./uploads/files" }); // Creating a multer middleware for file upload and setting the destination directory

// Routes
router.get("/", homeController.home); // Home route, renders the home page
router.post("/upload", uploadFile.single("csvFile"), fileController.upload); // Upload route, handles file upload
router.get("/delete/:id", fileController.delete); // Delete route, handles file deletion
router.get("/preview/:id", fileController.preview); // Preview route, renders the file preview page

module.exports = router; // Exporting the router for use in other parts of the application
