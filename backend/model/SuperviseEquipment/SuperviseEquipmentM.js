const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperviseSchema = new Schema({
    name: { type: String, required: true },
    MachineId: { type: String, required: true },
    Id: { type: String, required: true },
    Area: { type: String, required: true },
    deat: { type: String, required: true },
    Note: { type: String, required: true },
    image: { type: String } // Add this line for image URL/path
});

module.exports = mongoose.model('SuperviseEquipment', SuperviseSchema);
