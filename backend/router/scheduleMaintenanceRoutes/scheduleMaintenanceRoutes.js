const express = require('express');
const router = express.Router();
const ScheduleMaintenanceC = require('../../controllers/ScheduleMaintenanceC/ScheduleMaintenanceC');


router.get("/", ScheduleMaintenanceC.getSchedules);

// Get maintainin member by ID
router.get("/:id",  ScheduleMaintenanceC.getScheduleById);

// Add new maintainin member
router.post("/", ScheduleMaintenanceC.addSchedule);

// Update maintainin member
router.put("/:id", ScheduleMaintenanceC.updateScheduleById);

// Delete maintainin member
router.delete("/:id", ScheduleMaintenanceC.deleteScheduleById);
module.exports = router;
