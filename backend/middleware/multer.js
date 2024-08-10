const multer = require('multer');
const path = require('path');

// Configure storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder to store files
    },
    filename: (req, file, cb) => {
        // Define the file name to be saved
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage options
const upload = multer({ storage: storage });

module.exports = upload;
