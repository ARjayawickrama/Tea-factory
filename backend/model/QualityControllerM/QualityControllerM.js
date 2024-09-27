const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QualityControlSchema = new Schema({
    Manufacture: {
        type: String,
        required: true,
    },
    Flavor: {
        type: String,
        required: true,
    },
    TeaGrade: {
        type: String,
        required: true,
    },
    Color: {
        type: String,
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

module.exports = mongoose.model('QualityControl', QualityControlSchema);
