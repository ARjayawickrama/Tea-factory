const express = require('express');
const router = express.Router();
const qualityController = require('../../controllers/QualityController/QualityControllerC');

router.get('/', qualityController.getQualityControls);
router.get('/:id', qualityController.getQualityControlById);
router.post('/', qualityController.addQualityControl);
router.put('/:id', qualityController.updateQualityControl);
router.delete('/:id', qualityController.deleteQualityControl);

module.exports = router;
