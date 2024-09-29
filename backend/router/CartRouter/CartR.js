const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/CartController/CartC');
const authenticateToken = require('../../utils/authMiddleware');

// Define cart routes with authentication
router.post('/add', authenticateToken, cartController.addToCart);
router.get('/', authenticateToken, cartController.getCartByUserId); // Adjusted to not require customerId in params
router.delete('/remove', authenticateToken, cartController.removeFromCart);
router.put('/update-quantity', authenticateToken, cartController.updateCartItemQuantity);

module.exports = router;
