import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeaManager() {
  const [form, setForm] = useState({
    typeOfTea: '',
    teaGrade: '',
    flavor: '',
    date: '',
    color: '',
    note: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/QualityController', form);
      setForm({
        typeOfTea: '',
        teaGrade: '',
        flavor: '',
        date: '',
        color: '',
        note: '',
      });
    } catch (err) {
      setError('Failed to submit tea entry.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Tea Manager</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Add New Tea Entry</h2>
        <div>
          <label className="block text-gray-700">Type of Tea</label>
          <input
            type="text"
            name="typeOfTea"
            value={form.typeOfTea}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Tea Grade</label>
          <input
            type="text"
            name="teaGrade"
            value={form.teaGrade}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Flavor</label>
          <input
            type="text"
            name="flavor"
            value={form.flavor}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={form.color}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Note</label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-teal-500 font-semibold rounded-md shadow-md hover:bg-teal-600"
        >
          Add Tea Entry
        </button>
      </form>
    </div>
  );
}
