const express = require('express');
const router = express.Router();
const EmployeeController = require('../');


router.get('/', EmployeeController.getEmployeeControls);
router.get('/:id', EmployeeController.getEmployeeControlById);
router.post('/', EmployeeController.addEmployeeControl);
router.put('/:id', EmployeeController.updateEmployeeControl);
router.delete('/:id', EmployeeController.deleteEmployeeControl);

module.exports = router;
