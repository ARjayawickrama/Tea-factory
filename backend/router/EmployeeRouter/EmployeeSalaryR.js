const express = require('express');
const router = express.Router();
const salaryController = require('../../controllers/EmployeeController/EmployeeSalaryC');

// Define routes
router.get('/', salaryController.getSalaries);
router.post('/', salaryController.saveSalary);
router.delete('/:id', salaryController.deleteSalary); // Added delete route

module.exports = router;
