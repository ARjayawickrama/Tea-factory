const mongoose = require('mongoose');

// Define a schema for the order
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  cartItems:[
    {   
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        weight: { type: String, required: true },
    }
], 
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Requested' },
  createdAt: { type: Date, default: Date.now },
});

const CheckoutModel = mongoose.model('Order', OrderSchema);
module.exports = CheckoutModel;