const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    EmployeeID: { type: String, required: true },
    NIC: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: Number, required: true },
    Department: { type: String, required: true },
    Attendance: { type: String, required: true },
 
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;