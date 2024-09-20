import React, { useState } from 'react';

export default function SuperviseCalculate() {
  const [workingHours, setWorkingHours] = useState('');
  const [sparyar, setSparyar] = useState('');
  const [questionYesNo, setQuestionYesNo] = useState('');
  const [howMany, setHowMany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the calculation or form submission logic here
    console.log({
      workingHours,
      sparyar,
      questionYesNo,
      howMany,
    });
  };

  return (
    <div className="w-full max-w-lg p-4 border mx-auto mt-32 border-black bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Technician Working Hours:
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
      </form>
    </div>
  );
}
