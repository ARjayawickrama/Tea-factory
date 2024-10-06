/*const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    EmployeeID: { type: String, required: true },
    NIC: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true }, // Changed Phone to String to handle various phone number formats
    Department: { type: String, required: true },
    Attendance: { type: String }, // Optional field, remove 'required' if not necessary
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;*/

//EmployeeM
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    EmployeeID: { type: String, required: true },
    NIC: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true }, // Changed Phone to String to handle various phone number formats
    Birthday: { type: String, required: true }, // Ensure Birthday is defined
    Department: { type: String, required: true },
    Designation: { type: String, required: true },
    BasicSalary: { type: Number, required: true }, // Ensure Basic_Salary is defined
    attendanceStatus: { type: String }, // Optional field, remove 'required' if not necessary
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
