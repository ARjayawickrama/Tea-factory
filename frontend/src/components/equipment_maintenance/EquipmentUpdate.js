import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EquipmentUpdate = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing equipment data when component mounts
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/services/${id}`);
        setName(response.data.equipment.name);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5004/services/${id}`, { name });
      navigate('/'); // Navigate back to equipment list after update
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>Update Equipment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EquipmentUpdate;
