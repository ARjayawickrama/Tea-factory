const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Add productId to reference the Product
            productName: { type: String, required: true }, 
            quantity: { type: Number, required: true },
            weight: { type: String, required: true }, 
            price: { type: Number, required: true }, 
        }
    ]
});


const CartModel = mongoose.model('shoppingCart', cartSchema);
module.exports = CartModel;