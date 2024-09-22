
const express = require('express');
const router = express.Router();
const financialSupplierController = require('../../controllers/SupplierC/FinancialSupplierC');


router.post('/', financialSupplierController.createSupplier);
router.get('/', financialSupplierController.getSuppliers);
router.put('/:id', financialSupplierController.updateSupplier);
router.delete('/:id', financialSupplierController.deleteSupplier);

module.exports = router;
