const express = require('express');
const router = express.Router();
const { confirmOrder, getOrderHistory, deleteOrder, updateOrder } = require('../../controllers/CheckoutController/CheckoutC');

// Route to handle order confirmation
router.post('/confirm-order', confirmOrder);

// Route to get all orders
router.get('/orders/:userId', getOrderHistory);

// Route to delete an order
router.delete('/delete-order/:Id', deleteOrder);

// Route to update an order
router.put('/update-order/:Id', updateOrder);

module.exports = router;
