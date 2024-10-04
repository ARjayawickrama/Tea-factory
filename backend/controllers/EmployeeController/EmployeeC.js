/*const EmployeeControl = require("../../model/EmployeeModel/EmployeeM");

const getEmployeeControls = async (req, res) => {
  try {
    const employees = await EmployeeControl.find();
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employee entries found." });
    }
    return res.status(200).json({ employees });
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve employee entries." });
  }
};

const getEmployeeControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeControl.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ employee });
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve employee entry." });
  }
};

const addEmployeeControl = async (req, res) => {
  const { EmployeeID, NIC, Name, Email, Address, Phone,Birthday, Department,Designation,Basic_Salary, } = req.body;
  try {
    const newEmployee = new EmployeeControl({ EmployeeID, NIC, Name, Email, Address, Phone,Birthday, Department, Designation, Basic_Salary, });
    await newEmployee.save();
    return res.status(201).json({ newEmployee });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add employee entry." });
  }
};

const updateEmployeeControl = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const employee = await EmployeeControl.findByIdAndUpdate(id, updates, { new: true });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ employee });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update employee entry." });
  }
};

const deleteEmployeeControl = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeControl.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ message: "Employee entry deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete employee entry." });
  }
};

module.exports = {
  getEmployeeControls,
  getEmployeeControlById,
  addEmployeeControl,
  updateEmployeeControl,
  deleteEmployeeControl,
};*/


const EmployeeControl = require("../../model/EmployeeModel/EmployeeM");

// Retrieve all employees
const getEmployeeControls = async (req, res) => {
  try {
    const employees = await EmployeeControl.find();
    if (employees.length === 0) {
      return res.status(404).json({ message: "No employee entries found." });
    }
    return res.status(200).json({ employees });
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve employee entries." });
  }
};

// Retrieve an employee by ID
const getEmployeeControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeControl.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ employee });
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve employee entry." });
  }
};

// Add a new employee
const addEmployeeControl = async (req, res) => {
  const { 
    EmployeeID, 
    NIC, 
    Name, 
    Email, 
    Address, 
    Phone, 
    Birthday, 
    Department, 
    Designation, 
    Basic_Salary 
  } = req.body;

  try {
    const newEmployee = new EmployeeControl({ 
      EmployeeID, 
      NIC, 
      Name, 
      Email, 
      Address, 
      Phone, 
      Birthday, 
      Department, 
      Designation, 
      Basic_Salary 
    });

    await newEmployee.save();
    return res.status(201).json({ newEmployee });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Failed to add employee entry." });
  }
};

// Update an employee by ID
const updateEmployeeControl = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const employee = await EmployeeControl.findByIdAndUpdate(id, updates, { new: true });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ employee });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Failed to update employee entry." });
  }
};

// Delete an employee by ID
const deleteEmployeeControl = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeControl.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    return res.status(200).json({ message: "Employee entry deleted successfully." });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Failed to delete employee entry." });
  }
};

// Add attendance for an employee
const addAttendance = async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const employee = await EmployeeControl.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const attendanceRecord = {
      date: new Date(date),
      status,
    };

    employee.Attendance.push(attendanceRecord);
    await employee.save();

    return res.status(200).json({ message: "Attendance recorded successfully.", employee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to record attendance." });
  }
};

// Retrieve attendance for an employee
const getAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await EmployeeControl.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json({ attendance: employee.Attendance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to retrieve attendance." });
  }
};

// Update an attendance record for an employee
const updateAttendance = async (req, res) => {
  const { id, attendanceId } = req.params;
  const { status } = req.body;

  try {
    const employee = await EmployeeControl.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const attendanceRecord = employee.Attendance.id(attendanceId);
    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found." });
    }

    attendanceRecord.status = status;
    await employee.save();

    return res.status(200).json({ message: "Attendance updated successfully.", employee });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update attendance." });
  }
};

module.exports = {
  getEmployeeControls,
  getEmployeeControlById,
  addEmployeeControl,
  updateEmployeeControl,
  deleteEmployeeControl,
  addAttendance,
  getAttendance,
  updateAttendance,
};
