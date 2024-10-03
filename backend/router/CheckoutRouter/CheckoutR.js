//CheckoutR.js
const express = require('express');
const router = express.Router();
const { confirmOrder, getOrderHistory,getAllOrders, deleteOrder, updateOrder } = require('../../controllers/CheckoutController/CheckoutC');
const authenticateToken = require('../../utils/authMiddleware');
// Route to handle order confirmation
router.post('/confirm-order',authenticateToken, confirmOrder);

// Route to get all orders
router.get('/orders/:userId', authenticateToken ,getOrderHistory);

// Route to delete an order
router.delete('/delete-order/:Id', deleteOrder);

// Route to update an order
router.put('/update-order/:Id', updateOrder);

router.get('/orders', getAllOrders);

module.exports = router;
        