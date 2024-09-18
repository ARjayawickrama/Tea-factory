import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWithAnimation = ({ chartData }) => {
  const data = {
    labels: chartData.map((product) => product.product),
    datasets: [
      {
        label: 'Inventory',
        data: chartData.map((product) => product.items),
        backgroundColor: [
          '#1A4D2E ',
          '#4F6F52 ',
          '#C0C78C',  
          '#E8DFCA ',
          '#F5EFE6',
          
           
        ],
        hoverBackgroundColor: [
          '#1A4D2E ',
          '#4F6F52 ',
          '#C0C78C',  
          '#E8DFCA ',
          '#F5EFE6',
        ],
      },
    ],
  };

  const options = {
    animation: {
      duration: 3000, // Adjust the duration in milliseconds (3000ms = 3 seconds)
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChartWithAnimation;
