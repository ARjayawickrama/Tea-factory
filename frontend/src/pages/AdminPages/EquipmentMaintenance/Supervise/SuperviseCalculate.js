import React, { useState } from 'react';
import axios from 'axios';

export default function SuperviseCalculate() {
  const [workingHours, setWorkingHours] = useState(5000); // Default value set to 5000
  const [sparyar, setSparyar] = useState('');
  const [howMany, setHowMany] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [responseMessage, setResponseMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total based on form inputs
    let calculatedTotal = parseFloat(workingHours) || 0;

    if (sparyar === 'Yes' && howMany) {
      calculatedTotal += parseFloat(howMany) || 0;
    }

    setTotalAmount(calculatedTotal);

    // Prepare data to send to the backend
    const data = {
      workingHours,
      sparyar,
      howMany: sparyar === 'Yes' ? howMany : 0,
      totalAmount: calculatedTotal,
    };

    try {
      // Make POST request to the backend API
      const response = await axios.post('http://localhost:5004/api/SuperviseCalculate', data);

      // Handle success response
      setResponseMessage('Calculation submitted successfully!');
    } catch (error) {
      // Handle error response
      setResponseMessage('Failed to submit calculation. Please try again.');
    }
  };

  return (
    <div className=" ">
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Technician Working Hours (in rs):
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sparyar:
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={sparyar}
              onChange={(e) => setSparyar(e.target.value)}
              required
            >
              <option value="" disabled>Select Sparyar</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            If Yes, How Many?
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              value={howMany}
              onChange={(e) => setHowMany(e.target.value)}
              disabled={sparyar !== 'Yes'}
              required={sparyar === 'Yes'}
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Calculate
        </button>

        {totalAmount !== null && (
          <div className="mt-4 text-lg font-bold">
            Total Amount: {totalAmount} 
          </div>
        )}

        {responseMessage && (
          <div className={`mt-4 text-lg ${responseMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {responseMessage}
          </div>
        )}
      </form>
    </div>
  );
}
