import React, { useState } from 'react';
import axios from 'axios';

export default function QulatiIsusInfrom({ onSubmitSuccess }) {
  const [teaType, setTeaType] = useState('');
  const [teaGrade, setTeaGrade] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeaIssue = { teaType, teaGrade, date, quantity };

    try {
      await axios.post('http://localhost:5004/api/QulatiIsusInfrom', newTeaIssue);
      console.log('Tea issue added:', newTeaIssue);
      if (onSubmitSuccess) onSubmitSuccess(); // Notify parent component to refresh the list
      // Clear form fields
      setTeaType('');
      setTeaGrade('');
      setDate('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding tea issue:', error);
    }
  };

  return (
    <div className="w-96 h-auto absolute right-16 top-11 bg-amber-700 shadow-md p-4 rounded">
      <h1 className="text-xl font-bold mb-4">Return</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type of Tea</label>
          <input
            type="text"
            value={teaType}
            onChange={(e) => setTeaType(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tea Grade</label>
          <input
            type="text"
            value={teaGrade}
            onChange={(e) => setTeaGrade(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
