const express = require('express');
const router = express.Router();

const upload = require('../../middleware/multer'); 

const resourceController = require('../../controllers/ResourceC/ResourceC');


router.get('/', resourceController.getResources);
router.post('/', upload.single('image'), resourceController.addResource); 
router.put('/:id', upload.single('image'), resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
