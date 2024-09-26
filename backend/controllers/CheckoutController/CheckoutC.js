// CheckoutC.js
const CheckoutModel = require('../../model/CheckoutModel/CheckoutM');

// Controller function to handle order confirmation
const confirmOrder = async (req, res) => {
    try {
      const { name, contact, email, cartItems } = req.body;
  
      if (!name || !contact || cartItems.length === 0) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
  
      const newOrder = new CheckoutModel({
        name,
        contact,
        email,
        cartItems,
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        status: 'Requested', // Default status when placing an order
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while placing the order.' });
    }
  };
  

// Fetch all orders
const getOrders = async (req, res) => {
    try {
        const orders = await CheckoutModel.find();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders.' });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await CheckoutModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order.' });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; // Get status from the request body
      const updatedData = { ...req.body, status }; // Include status in the update
      const updatedOrder = await CheckoutModel.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json({ message: 'Order updated successfully!', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order.' });
    }
  };
  

module.exports = {
    confirmOrder,
    getOrders,
    deleteOrder,
    updateOrder,
};
