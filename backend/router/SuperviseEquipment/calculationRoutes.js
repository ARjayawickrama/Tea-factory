const express = require('express');
const { calculateTotal, getAllCalculations } = require('../../controllers/SuperviseEquipment/calculationController');
const router = express.Router();

router.post('/SuperviseCalculate', calculateTotal);
router.get('/SuperviseCalculate', getAllCalculations);

module.exports = router;