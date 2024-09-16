const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    method: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Credit Card'],
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    }
});

module.exports = mongoose.model("Payment", PaymentSchema);
