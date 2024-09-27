const mongoose = require('mongoose');

const qualitySupplierSchema = new mongoose.Schema({
  typeOfTea: { type: String, required: true },
  teaGrade: { type: String, required: true },
  flavour: { type: String, required: true },
  date: { type: Date, required: true },
  color: { type: String, required: true },
  note: { type: String, required: true }
});

const QualitySupplier = mongoose.model('QualitySupplier', qualitySupplierSchema);

module.exports = QualitySupplier;
