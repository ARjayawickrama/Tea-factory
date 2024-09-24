const express = require('express');
const router = express.Router();
const { confirmOrder, getOrders, deleteOrder, updateOrder } = require('../../controllers/CheckoutController/CheckoutC');

// Route to handle order confirmation
router.post('/confirm-order', confirmOrder);

// Route to get all orders
router.get('/orders', getOrders);

// Route to delete an order
router.delete('/delete-order/:id', deleteOrder);

// Route to update an order
router.put('/update-order/:id', updateOrder);

module.exports = router;
