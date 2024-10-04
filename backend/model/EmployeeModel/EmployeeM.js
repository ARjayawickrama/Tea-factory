const mongoose = require('mongoose');

// Schema for storing attendance records
const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

// Employee Schema
const EmployeeSchema = new mongoose.Schema({
  EmployeeID: { type: String, required: true },
  NIC: { type: String, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Address: { type: String, required: true },
  Phone: { type: String, required: true },
  Birthday: { type: Date, required: true },
  Department: { type: String, required: true },
  Designation: { type: String, required: true },
  Basic_Salary: { type: Number, required: true },
  Attendance: [AttendanceSchema], // Array of attendance records
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
