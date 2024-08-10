import React, { useState } from 'react';
import axios from 'axios';

const Supervise = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [machineId, setMachineId] = useState('');
  const [id, setId] = useState('');
  const [area, setArea] = useState('');
  const [deat, setDeat] = useState(''); // Details or description
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null); // For image file
  const [error, setError] = useState(null); // To handle error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state before making request

    const formData = new FormData();
    formData.append('name', name);
    formData.append('MachineId', machineId);
    formData.append('Id', id);
    formData.append('Area', area);
    formData.append('deat', deat);
    formData.append('Note', note);
    if (image) {
      formData.append('image', image); // Append image file if selected
    }

    try {
      const response = await axios.post('http://localhost:5004/supervise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      // Reset form fields
      setName('');
      setMachineId('');
      setId('');
      setArea('');
      setDeat('');
      setNote('');
      setImage(null);
      if (onSuccess) onSuccess(); // Trigger success callback if provided
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setError('There was a problem with the form submission. Please try again.'); // Show error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Machine ID:
            <input
              type="text"
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            ID:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Area:
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Deat:
            <textarea
              value={deat}
              onChange={(e) => setDeat(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Note:
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Image:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
    </div>
  );
};

export default Supervise;
