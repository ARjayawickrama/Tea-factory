const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleMaintenanceSchema = new Schema({
    name: { type: String, required: true },
    MachineId: { type: String, required: true },
    Area: { type: String, required: true },
    Condition: { type: String, required: true },
    LastDate: { type: Date, required: true },
    NextDate: { type: Date, required: true },
    Note: { type: String, required: true }
});

module.exports = mongoose.model('ScheduleMaintenance', ScheduleMaintenanceSchema);
