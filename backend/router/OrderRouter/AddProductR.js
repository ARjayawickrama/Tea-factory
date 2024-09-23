const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/OrderController/AddProductC');
const multer = require('multer'); // Middleware for handling file uploads
const fs = require('fs');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});
const upload = multer({ storage });


// Add a route to serve images directly
router.get('/images/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '../../uploads/', req.params.filename);
  
    // Check if the file exists
    fs.stat(imagePath, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      // Serve the image file
      res.sendFile(imagePath);
    });
  });
  
// Routes
router.get('/', ProductController.getProducts); // Get all products
router.get('/:id', ProductController.getProductById); // Get product by ID
router.post('/', upload.single('productImage'), ProductController.addProduct); // Add new product with image upload
router.put('/:id', upload.single('productImage'), ProductController.updateProduct); // Update product with image upload
router.delete('/:id', ProductController.deleteProduct); // Delete product

module.exports = router;
