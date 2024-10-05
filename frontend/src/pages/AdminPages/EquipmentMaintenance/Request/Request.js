import React, { useState } from 'react';
import axios from 'axios';

export default function Request() {
  const [numberOfTechnicians, setNumberOfTechnicians] = useState('');
  const [area, setArea] = useState('');
  const [employmentType, setEmploymentType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5004/TechnicianRequest', {
        numberOfTechnicians,
        area,
        employmentType,
      });
      alert('Request sent successfully!');
    
      setNumberOfTechnicians('');
      setArea('');
      setEmploymentType('');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Error sending request.');
    }
  };

  // Block negative numbers and restrict the max value to 10
  const handleNumberChange = (e) => {
    const value = e.target.value;
    // Ensure value is non-negative and does not exceed 10
    if (!isNaN(value) && Number(value) >= 0 && Number(value) <= 10) {
      setNumberOfTechnicians(value);
    }
  };

  // Prevent typing negative sign and scientific notation
  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="bg-white border p-4 h-56 w-96 rounded-xl hover:scale-105 hover:shadow-lg hover:bg-gray-100">
        <div className="text-center text-teal-500 text-lg relative bottom-4 font-medium">
          Technician Request
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="number"
            placeholder="Number Technician"
            value={numberOfTechnicians}
            onChange={handleNumberChange}
            onKeyDown={handleKeyDown}  // Prevent negative input
            className="w-full border p-1 mb-2"
            min="0"  // Ensure non-negative values
            max="10"  // Set maximum value to 10
          />
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border p-1 mb-2"
          >
            <option value="">Area</option>
            <option value="Akurassa">Akurassa</option>
            <option value="Deniyaya">Deniyaya</option>
            <option value="Bandarawela">Kandy</option>
          </select>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full border p-1 mb-2"
          >
            <option value="">Employ Type</option>
            <option value="Maintenance Technician">Maintenance Technician</option>
            <option value="Electrical Technician">Electrical Technician</option>
            <option value="Instrumentation Technician">Instrumentation Technician</option>
            <option value="Machine Operator">Machine Operator</option>
          </select>
          <button type="submit" className="bg-amber-500 text-white p-2 w-full">
            Send Employee Management
          </button>
        </form>
      </div>
    </div>
  );
}
