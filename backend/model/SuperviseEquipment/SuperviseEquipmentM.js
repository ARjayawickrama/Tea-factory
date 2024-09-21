const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuperviseSchema = new Schema({
    name: { type: String, required: true },
    MachineId: { type: String, required: true },
    date: { type: String, required: true }, // Changed from 'deat' to 'date'
    Area: { type: String, required: true },
    Note: { type: String, required: true },
    MachineStatus: { type: String, required: true } // Changed from 'Status' to 'MachineStatus'
});

const SuperviseEquipment = mongoose.model('SuperviseEquipment', SuperviseSchema);

module.exports = SuperviseEquipment;
