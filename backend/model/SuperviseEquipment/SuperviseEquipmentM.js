const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperviseSchema = new Schema({
    name: { type: String, required: true },
    MachineId: { type: String, required: true },
    deat: { type: String, required: true },
    Area: { type: String, required: true },
    Note: { type: String, required: true }
});

module.exports = mongoose.model('SuperviseEquipment', SuperviseSchema);
