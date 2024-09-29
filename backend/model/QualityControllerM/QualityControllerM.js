const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({
    typeOfTea: { type: String, required: true },
    teaGrade: { type: String, required: true },
    flavor: { type: String, required: true },
    date: { type: Date, required: true },
    color: { type: String, required: true },
    note: { type: String },
});

const QualityControl = mongoose.model('QualityControl', qualityControlSchema);
module.exports = QualityControl;