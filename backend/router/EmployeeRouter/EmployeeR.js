const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController/EmployeeC');

// Employee routes
router.get('/', EmployeeController.getEmployeeControls);
router.get('/:id', EmployeeController.getEmployeeControlById);
router.post('/', EmployeeController.addEmployeeControl);
router.put('/:id', EmployeeController.updateEmployeeControl);
router.delete('/:id', EmployeeController.deleteEmployeeControl);

// Attendance-specific routes
router.post('/:id/attendance', EmployeeController.addAttendance); // Add attendance
router.get('/:id/attendance', EmployeeController.getAttendance); // Retrieve attendance
router.put('/:id/attendance/:attendanceId', EmployeeController.updateAttendance); // Update attendance

module.exports = router;
