// CheckoutR.js
const express = require('express');
const router = express.Router();
const { confirmOrder } = require('../../controllers/CheckoutController/CheckoutC');

// Route to handle order confirmation
router.post('/confirm-order', confirmOrder);

module.exports = router;
