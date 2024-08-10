import React, { useState } from 'react';
import axios from 'axios';

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [machineId, setMachineId] = useState('');
  const [id, setId] = useState('');
  const [area, setArea] = useState('');
  const [deat, setDeat] = useState(''); // Changed to match backend
  const [note, setNote] = useState('');
  const [error, setError] = useState(null); // To handle error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state before making request

    try {
      const response = await axios.post('http://localhost:5004/supervise', {
        name,
        MachineId: machineId, // Ensure this matches the backend field name
        Id: id,               // Ensure this matches the backend field name
        Area: area,           // Ensure this matches the backend field name
        deat,                 // Ensure this matches the backend field name
        Note: note            // Ensure this matches the backend field name
      });

      console.log('Success:', response.data);
      setName('');
      setMachineId('');
      setId('');
      setArea('');
      setDeat('');
      setNote('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setError('There was a problem with the form submission. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Machine ID:
            <input type="text" value={machineId} onChange={(e) => setMachineId(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            ID:
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Area:
            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Deat:
            <textarea value={deat} onChange={(e) => setDeat(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>
            Note:
            <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Supervise;
