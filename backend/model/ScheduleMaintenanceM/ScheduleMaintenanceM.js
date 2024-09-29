const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleMaintenanceSchema = new Schema({
  name: { type: String, required: true },
  MachineId: { type: String, required: true },
  Area: { type: String, required: true },
  Condition: { type: String, required: true },
  LastDate: { type: String, required: true },
  NextDate: { type: String, required: true },
  Note: { type: String, required: true },
});

module.exports = mongoose.model(
  "ScheduleMaintenance",
  ScheduleMaintenanceSchema
);
