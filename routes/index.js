const express = require("express");
const router = express.Router();

const multer = require("multer");

const homeController = require("../controllers/homeController");
const fileController = require("../controllers/fileController");
const uploadFile = multer({ dest: "./uploads/files" });

router.get("/", homeController.home);
router.post("/upload", uploadFile.single("csvFile"), fileController.upload);
router.get("/delete/:id", fileController.delete);
router.get("/preview/:id", fileController.preview);

module.exports = router;
