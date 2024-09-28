// routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const resourceController = require("../../controllers/ResourceC/ResourceC");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, "../../uploads");

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Set a unique filename using timestamp and original name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route to get all resources
router.get("/", resourceController.getResources);

// Route to serve resource images
router.get("/images/:filename", (req, res) => {
  const imagePath = path.join(__dirname, "./uploads/", req.params.filename);

  console.log(imagePath);

  // Check if the image exists
  fs.stat(imagePath, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Send the image file
    res.sendFile(imagePath);
  });
});

// Route to add a new resource
router.post("/", upload.single("image"), resourceController.addResource);

// Route to update an existing resource
router.put("/:id", upload.single("image"), resourceController.updateResource);

// Route to delete a resource
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
