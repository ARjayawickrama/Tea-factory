import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EquipmentForm() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', name);
    axios.post('http://localhost:5004/services', { name })
      .then(() => {
      navigate('/');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  }
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div className="">
    
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
         
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
          <a href='EquipmentDisplay' className=' text-slate-900'>Display</a>
        </form>
      </div>
    
  );
}
