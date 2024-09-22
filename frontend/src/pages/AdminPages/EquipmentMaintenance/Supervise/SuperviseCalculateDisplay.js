import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperviseCalculateDisplay = () => {
  const [calculations, setCalculations] = useState([]);
  const [error, setError] = useState(null);

  const fetchCalculations = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/SuperviseCalculate');
      setCalculations(response.data);
    } catch (error) {
      setError('Failed to fetch calculations');
      console.error('Error fetching calculations:', error);
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Calculations</h1>
      <ul>
        {calculations.map((calc) => (
          <li key={calc._id}>
            Working Hours: {calc.workingHours}, Sparyar: {calc.sparyar}, How Many: {calc.howMany}, Total Amount: {calc.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperviseCalculateDisplay;
