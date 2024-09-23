// CheckoutM.js
const mongoose = require('mongoose');

// Define a schema for the cart items
const CartItemSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedWeight: { type: String }, // Include weight if necessary
});

// Define a schema for the order
const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    cartItems: [CartItemSchema], // Array of cart items
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CheckoutModel = mongoose.model('Order', OrderSchema);
module.exports = CheckoutModel;
