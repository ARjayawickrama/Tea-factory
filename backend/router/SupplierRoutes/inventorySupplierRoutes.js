const express = require('express');
const router = express.Router();
const inventorySupplierController = require('../../controllers/SupplierC/inventorySupplierController');


router.get('/', inventorySupplierController.getSuppliers);

router.post('/', inventorySupplierController.addSupplier);

router.put('/:id', inventorySupplierController.updateSupplier);


router.delete('/:id', inventorySupplierController.deleteSupplier);

module.exports = router;
