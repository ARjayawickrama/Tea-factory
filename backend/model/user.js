const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    gender: { type: String },
    role: { 
        type: String, 
        enum: [
            "admin", 
            "admin2", 
            "admin3", 
            "admin4", 
            "admin5", 
            "admin6", 
            "admin7", 
            "admin8", 
            "customer" // Default role
        ],
        default: "customer" 
    }
});

module.exports = mongoose.model("User", userSchema);
