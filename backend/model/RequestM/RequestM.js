
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicianRequestSchema = new Schema({
    numberOfTechnicians: { type: Number, required: true },
    area: { type: String, required: true },
    employmentType: { type: String, required: true },
});

module.exports = mongoose.model('TechnicianRequest', technicianRequestSchema);
