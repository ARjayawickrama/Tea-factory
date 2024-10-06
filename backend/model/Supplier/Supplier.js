const mongoose = require('mongoose');

// Create a regex for validating phone numbers (10 digits)
const phoneNumberRegex = /^\d{10}$/;

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, // Optional: Ensures email addresses are unique
        lowercase: true, // Optional: Convert email to lowercase
        trim: true // Optional: Trim whitespace
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return phoneNumberRegex.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    date: { 
        type: Date, 
        validate: {
            validator: function(v) {
                // Check if the date is in the future
                return v <= Date.now();
            },
            message: props => `Selected date ${props.value} cannot be in the future!`
        }
    }
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

module.exports = mongoose.model('Supplier', SupplierSchema);
