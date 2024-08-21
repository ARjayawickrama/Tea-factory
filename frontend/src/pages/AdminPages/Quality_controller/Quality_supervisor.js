import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Added import for Link

const TeaManagement = () => {
  const [teas, setTeas] = useState([]);
  const [error, setError] = useState('');
  const [newTea, setNewTea] = useState({
    typeOfTea: '',
    teaGrade: '',
    flavor: '',
    date: '',
    color: '',
    note: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar

  // Fetch teas
  const fetchTeas = async () => {
    try {
      const response = await axios.get('http://localhost:5004/QualityController');
      setTeas(response.data.qualityControls); // Ensure data is accessed correctly
    } catch (err) {
      setError(`Failed to fetch teas. ${err.response ? err.response.data.message : err.message}`);
      console.error('Fetch Teas Error:', err);
    }
  };

  // Insert new tea
  const insertTea = async () => {
    try {
      await axios.post('http://localhost:5004/QualityController', newTea);
      fetchTeas(); // Refresh the tea list
      setNewTea({
        typeOfTea: '',
        teaGrade: '',
        flavor: '',
        date: '',
        color: '',
        note: ''
      }); // Clear the form
    } catch (err) {
      setError(`Failed to insert tea. ${err.response ? err.response.data.message : err.message}`);
      console.error('Insert Tea Error:', err);
    }
  };

  useEffect(() => {
    fetchTeas();
  }, []);

  const handleChange = (e) => {
    setNewTea({
      ...newTea,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertTea();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-teal-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
            <li className="p-4 cursor-pointer bg-teal-500 mt-2 flex items-center">
              <Link to="/QualityControllerManeger" className="text-white">Supervise</Link>
            </li>
            {/* Add other sidebar items here */}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-2xl font-bold mb-4">Tea Management</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
          <input
            type="text"
            name="typeOfTea"
            value={newTea.typeOfTea}
            onChange={handleChange}
            placeholder="Type of Tea"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="teaGrade"
            value={newTea.teaGrade}
            onChange={handleChange}
            placeholder="Tea Grade"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="flavor"
            value={newTea.flavor}
            onChange={handleChange}
            placeholder="Flavor"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={newTea.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="color"
            value={newTea.color}
            onChange={handleChange}
            placeholder="Color"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="note"
            value={newTea.note}
            onChange={handleChange}
            placeholder="Note"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600">Add Tea</button>
        </form>
        <h2 className="text-xl font-semibold mt-6">Tea List</h2>
        <ul className="list-disc pl-5 mt-2">
          {teas.map((tea, index) => (
            <li key={index} className="mb-2">
              {tea.typeOfTea} - {tea.teaGrade} - {tea.flavor}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TeaManagement;
