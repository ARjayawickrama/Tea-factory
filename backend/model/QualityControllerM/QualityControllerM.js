const mongoose = require('mongoose');
const { Schema } = mongoose;


const qualityControllerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    area: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Supervisor', 'Manager', 'Inspector']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


const QualityController = mongoose.model('QualityController', qualityControllerSchema);

module.exports = QualityController;
