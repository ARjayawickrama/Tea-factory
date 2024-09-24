// CheckoutC.js
const CheckoutModel = require('../../model/CheckoutModel/CheckoutM');

// Controller function to handle order confirmation
const confirmOrder = async (req, res) => {
    try {
        const { name, contact, email, cartItems } = req.body;

        // Validate the required fields
        if (!name || !contact || cartItems.length === 0) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Create a new order in the database
        const newOrder = new CheckoutModel({
            name,
            contact,
            email,
            cartItems,
            totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        });

        // Save the order
        await newOrder.save();

        // Send success response
        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error(error);
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
        const updatedData = req.body;
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
