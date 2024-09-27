 // PieChartWithAnimation.js
 import React from 'react';
 import { Pie } from 'react-chartjs-2';
 import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
 
 // Register required components
 ChartJS.register(ArcElement, Tooltip, Legend);
 
 const PieChartWithAnimation = ({ chartData }) => {
   const data = {
     labels: chartData.map((product) => product.product), // `product` for the label
     datasets: [
       {
         label: 'Inventory',
         data: chartData.map((product) => product.items), // `items` for the data
         backgroundColor: [
           '#1A4D2E',
           '#4F6F52',
           '#C0C78C',
           '#E8DFCA',
           '#F5EFE6',
         ],
         hoverBackgroundColor: [
           '#1A4D2E',
           '#4F6F52',
           '#C0C78C',
           '#E8DFCA',
           '#F5EFE6',
         ],
       },
     ],
   };
 
   const options = {
     animation: {
       duration: 3000, // Animation duration in milliseconds
     },
     responsive: true,
     maintainAspectRatio: false,
   };
 
   return (
     <div className="p-4">
       <h2 className="text-xl font-bold mb-4">Inventory Distribution</h2>
       <div style={{ height: '400px', width: '100%' }}>
         <Pie data={data} options={options} />
       </div>
     </div>
   );
 };
 
 
 export default PieChartWithAnimation;