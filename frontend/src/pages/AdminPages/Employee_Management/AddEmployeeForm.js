import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const getDateYearsAgo = (years) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

function AddEmployeeForm() {
  const [employee, setEmployee] = useState({
    EmployeeID: '',
    NIC: '',
    Name: '',
    Email: '',
    Address: '',
    Phone: '',
    Birthday: '',
    Department: '',
    Designation: '',
    BasicSalary: '',
    
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const minBirthday = getDateYearsAgo(65);
  const maxBirthday = getDateYearsAgo(18);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent invalid input based on field type
    if (name === 'Name' && /[0-9]/.test(value)) {
      return;
    }
    if (name === 'Phone' && (/[^0-9]/.test(value) || value.length > 10)) {
      return;
    }
    if (name === 'NIC' && (/[^0-9vV]/.test(value) || value.length > 12)) {
      return;
    }
    if (name === 'BasicSalary' && /[^0-9]/.test(value)) {
      return;
    }

    // Prevent numbers in Department and Designation fields
    if ((name === 'Department' || name === 'Designation') && /[^a-zA-Z\s]/.test(value)) {
      return;
    }

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const departmentRegex = /^[A-Za-z\s]+$/;
    const designationRegex = /^[A-Za-z\s]+$/;
    const nicRegex = /^\d{12}$|^\d{9}[Vv]$/;
    

    switch (name) {
      case 'EmployeeID':
        newErrors.EmployeeID = value ? '' : '';
        break;
      case 'NIC':
        newErrors.NIC = value && nicRegex.test(value) ? '' : '';
        break;
      case 'Name':
        newErrors.Name = value && nameRegex.test(value) ? '' : '';
        break;
      case 'Email':
        newErrors.Email = value && emailRegex.test(value) ? '' : '';
        break;
      case 'Address':
        newErrors.Address = value ? '' : '';
        break;
      case 'Phone':
        newErrors.Phone = value && phoneRegex.test(value) ? '' : '';
        break;
      case 'Department':
        newErrors.Department = value && departmentRegex.test(value)
          ? ''
          : '';
        break;
      case 'Designation':
        newErrors.Designation = value && designationRegex.test(value)
          ? ''
          : '';
        break;
      case 'BasicSalary':
        newErrors.BasicSalary = value ? '' : '';
        break;
      case 'Birthday':
        if (!value) {
          newErrors.Birthday = '';
        } else {
          const age = new Date().getFullYear() - new Date(value).getFullYear();
          newErrors.Birthday =
            age >= 18 && age <= 65 ? '' : 'Employee must be between 18 and 65 years old';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(employee).forEach((key) => {
      if (!employee[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5004/Employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      navigate('/Employee_Management');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 mt-9 flex items-center">
              <button className="w-full flex items-center bg-amber-500 p-4 rounded">
                <FaUsers className="w-8 h-8 mr-4" />
                <span>Employee Management</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <main className="relative left-59 flex-grow p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(employee).map((key) => (
              <div className="mb-1" key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, ' $1')} <span className="text-red-500">*</span>
                </label>
                {key === 'Birthday' ? (
                  <input
                    type="date"
                    id={key}
                    name={key}
                    value={employee[key]}
                    min={minBirthday}
                    max={maxBirthday}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    type={key === 'Email' ? 'email' : 'text'}
                    id={key}
                    name={key}
                    placeholder={key}
                    value={employee[key]}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
              >
                Add Employee
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEmployeeForm;
