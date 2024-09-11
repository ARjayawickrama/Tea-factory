const express = require('express');
const router = express.Router();
const RawMaterialsController = require('../../controllers/InventoryController/RawAdd'); // Adjust the path as needed

// Get all raw materials
router.get('/', RawMaterialsController.getRawMaterials);

// Get raw material by ID
router.get('/:id', RawMaterialsController.getRawMaterialById);

// Add new raw material
router.post('/', RawMaterialsController.addRawMaterial);

// Update raw material
router.put('/:id', RawMaterialsController.updateRawMaterial);

// Delete raw material
router.delete('/:id', RawMaterialsController.deleteRawMaterial);

 


module.exports = router;
