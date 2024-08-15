import React, { useState } from 'react';
import axios from 'axios';

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [machineId, setMachineId] = useState('');
  const [id, setId] = useState('');
  const [area, setArea] = useState('');
  const [deat, setDeat] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('MachineId', machineId);
    formData.append('Id', id);
    formData.append('Area', area);
    formData.append('deat', deat);
    formData.append('Note', note);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5004/supervise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      setName('');
      setMachineId('');
      setId('');
      setArea('');
      setDeat('');
      setNote('');
      setImage(null);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setError('There was a problem with the form submission. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4 absolute inset-0'>
      <div className='w-full max-w-lg p-4 border border-gray-300 rounded-lg shadow-md'>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name:
                <input
                  type="text"
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Machine ID:
                <input
                  type="text"
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={machineId}
                  onChange={(e) => setMachineId(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID:
                <input
                  type="text"
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area:
                <input
                  type="text"
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deat:
                <textarea
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={deat}
                  onChange={(e) => setDeat(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note:
                <textarea
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image:
                <input
                  type="file"
                  className='mt-1 block w-full text-sm text-gray-500 file:border file:border-gray-300 file:rounded-md file:px-3 file:py-2 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100'
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
            <div>
              <button type="submit" className='w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                Submit
              </button>
            </div>
          </div>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Supervise;
