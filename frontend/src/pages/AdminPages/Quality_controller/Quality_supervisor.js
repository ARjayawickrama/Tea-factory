import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeaManager() {
  const [teas, setTeas] = useState([]);
  const [form, setForm] = useState({
    typeOfTea: '',
    teaGrade: '',
    flavor: '',
    date: '',
    color: '',
    note: '',
  });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeas();
  }, []);

  const fetchTeas = async () => {
    try {
      const response = await axios.get('http://localhost:5004/QualityController');
      setTeas(response.data);
    } catch (err) {
      setError('Failed to fetch teas.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5004/QualityController/${editing}`, form);
        setEditing(null);
      } else {
        await axios.post('http://localhost:5004/QualityController', form);
      }
      setForm({
        typeOfTea: '',
        teaGrade: '',
        flavor: '',
        date: '',
        color: '',
        note: '',
      });
      fetchTeas();
    } catch (err) {
      setError('Failed to submit tea entry.');
      console.error(err);
    }
  };

  const handleEdit = (tea) => {
    setForm(tea);
    setEditing(tea._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/QualityController/${id}`);
      fetchTeas();
    } catch (err) {
      setError('Failed to delete tea entry.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Tea Manager</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{editing ? 'Edit Tea Entry' : 'Add New Tea Entry'}</h2>
        <div>
          <label className="block text-gray-700">Type of Tea</label>
          <input
            type="text"
            name="typeOfTea"
            value={form.typeOfTea}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
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
          {editing ? 'Update Tea Entry' : 'Add Tea Entry'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">Tea Entries</h2>
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="p-4 border-b">Type of Tea</th>
            <th className="p-4 border-b">Tea Grade</th>
            <th className="p-4 border-b">Flavor</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Color</th>
            <th className="p-4 border-b">Note</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teas.map(tea => (
            <tr key={tea._id}>
              <td className="p-4 border-b">{tea.typeOfTea}</td>
              <td className="p-4 border-b">{tea.teaGrade}</td>
              <td className="p-4 border-b">{tea.flavor}</td>
              <td className="p-4 border-b">{tea.date}</td>
              <td className="p-4 border-b">{tea.color}</td>
              <td className="p-4 border-b">{tea.note}</td>
              <td className="p-4 border-b">
                <button
                  onClick={() => handleEdit(tea)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tea._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
