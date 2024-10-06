const mongoose = require('mongoose');

const RawMaterialSchema = new mongoose.Schema({
     
    materialName: { type: String, required: true },
    stockedDate: { type: String, required: true },
    weight: { type: String, required: true },
    supplier: { type: String, required: true },
    supplierEmail: { type: String, required: true }    
});

const RawMaterial = mongoose.model('RawMaterial', RawMaterialSchema);

module.exports = RawMaterial;
