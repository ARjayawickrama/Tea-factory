import React, { useState } from 'react';
import axios from 'axios';

const Isus = ({ modalIsOpen, setModalIsOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:5004/EQIsus', formData);
    console.log('New entry added:', response.data);
    setFormData({ name: '', date: '', note: '' });
    setModalIsOpen(false); 
  };

  return (
    <div>
     

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${modalIsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ display: modalIsOpen ? 'flex' : 'none' }}
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-2/5">
          <h2 className="text-xl font-bold">Isus Modal</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="note">Note</label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Isus;
