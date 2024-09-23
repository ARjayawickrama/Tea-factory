const express = require('express');
const router = express.Router();
const qualitySupplierController = require('../../controllers/SupplierC/qualitySupplierController');

router.get('/', qualitySupplierController.getAllSuppliers);


router.post('/', qualitySupplierController.addSupplier);


router.put('/:id', qualitySupplierController.editSupplier);

router.delete('/:id', qualitySupplierController.deleteSupplier);

module.exports = router;
