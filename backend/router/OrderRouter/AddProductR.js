const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/OrderController/AddProductC');
const multer = require('multer'); 
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage });



router.get('/images/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '../../uploads/', req.params.filename);
  

    fs.stat(imagePath, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
    
      res.sendFile(imagePath);
    });
  });
  

router.get('/', ProductController.getProducts); 
router.get('/:id', ProductController.getProductById);
router.post('/', upload.single('productImage'), ProductController.addProduct); 
router.put('/:id', upload.single('productImage'), ProductController.updateProduct); 
router.delete('/:id', ProductController.deleteProduct); 

module.exports = router;