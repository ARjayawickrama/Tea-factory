const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QualityControlSchema = new Schema({
    typeOfTea: {
        type: String,
        required: true,
    },
    teaGrade: {
        type: String,
        required: true,
    },
    flavor: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('InventoryProduct', QualityControlSchema);
