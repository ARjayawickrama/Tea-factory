// CheckoutC.js
const CheckoutModel = require('../../model/CheckoutModel/CheckoutM');
const Cart = require('../../model/CartModel/CartM')
const nodemailer = require('nodemailer');

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
  const getAllOrders = async (req, res) => {
    try {
        const orders = await CheckoutModel.find().populate('cartItems.productId');
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
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
    const { orderId } = req.params;
    const { status } = req.body;
    
    const updatedOrder = await CheckoutModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (status === 'Complete') {
      // Send email receipt
      await sendEmailReceipt(updatedOrder);
    }

    res.status(200).json({ message: 'Order updated successfully!', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order.' });
  }
};


const sendEmailReceipt = async (order) => { // Add async keyword here
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sadeepmalaka2@gmail.com',
      pass: 'bfxr wzmt jalb grxp',
    },
  });

  const mailOptions = {
    from: 'sadeepmalaka2@gmail.com',
    to: order.email,
    subject: 'Order Receipt',
    text: `Dear ${order.name},\n\nYour order has been completed. Here is your receipt:\n\nTotal Price: Rs.${order.totalPrice}\n\nThank you for your purchase!`,
  };

  try {
    const info = await transporter.sendMail(mailOptions); // Await the email sending process
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


  

module.exports = {
    confirmOrder,
    getOrderHistory,  
    deleteOrder,
    updateOrder,
    sendEmailReceipt,
    getAllOrders,
};
