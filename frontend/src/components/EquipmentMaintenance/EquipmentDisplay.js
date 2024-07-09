import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import AdminDashboard from '../../components/Navigation_bar/Admin/AdminDashboard ';

const EquipmentDisplay = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/services`);
        setEquipment(response.data.equipment);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setError('Error fetching equipment. Please try again later.');
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/services/${id}`);
      
      setEquipment(equipment.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box className="flex flex-col items-center h-screen ml-200px">
      <AdminDashboard />
      <div>
        <h2 className="text-2xl font-bold mb-4">Equipment List</h2>
        <ul>
          {equipment.map((item) => (
            <li key={item._id} className="flex items-center justify-between bg-gray-100 px-4 py-2 mb-2 rounded">
              <span>{item.name}</span>
              <div className="space-x-2">
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded" onClick={() => navigate(`/EquipmentUpdate/${item._id}`)}>Update</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default EquipmentDisplay;
