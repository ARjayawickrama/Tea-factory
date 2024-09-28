// CheckoutC.js
const CheckoutModel = require('../../model/CheckoutModel/CheckoutM');
const Cart = require('../../model/CartModel/CartM')

// Controller function to handle order confirmation
const confirmOrder = async (req, res) => {
  const { userId } = req.body;
    try {
      const { name, contact, email, cartItems } = req.body;
  
      if (!name || !contact || cartItems.length === 0) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
  
      const newOrder = new CheckoutModel({
        userId,
        name,
        contact,
        email,
        cartItems,
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        status: 'Requested', // Default status when placing an order
      });
  
      await newOrder.save();
      await Cart.findOneAndDelete({ userId });
      res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while placing the order.' });
    }
  };
  

// Fetch all orders
const getOrderHistory  = async (req, res) => {
  const { userId } = req.params;

  try {
      const orders = await Order.find({ userId }).populate('items.productId');
      res.status(200).json(orders);
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const { orderId  } = req.params;
        await CheckoutModel.findByIdAndDelete(orderId );
        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order.' });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
      const { orderId  } = req.params;
      const { status } = req.body; // Get status from the request body
      const updatedData = { ...req.body, status }; // Include status in the update
      const updatedOrder = await CheckoutModel.findByIdAndUpdate(orderId , updatedData, { new: true });
      res.status(200).json({ message: 'Order updated successfully!', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order.' });
    }
  };
  

module.exports = {
    confirmOrder,
    getOrderHistory,
    deleteOrder,
    updateOrder,
};
