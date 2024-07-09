
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema=new Schema({
    name:{
        type: String,
        required: true, 
    }
})
module.exports = mongoose.model(
    "Equipment_maintenance",
    EquipmentSchema,
);