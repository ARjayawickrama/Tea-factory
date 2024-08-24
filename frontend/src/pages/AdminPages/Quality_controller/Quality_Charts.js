import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { TextField } from '@mui/material';

const colors = ['#239b02', '#b2a60c', '#56645e', '#e74c3c', '#3498db'];

// Example data for filtering (with new areas included)
const allData = {
  'Tea Quality A - Akurassa': [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  'Tea Quality B - Deniyaya': [3, 6, 8, 5, 7, 9, 7, 10, 11, 12, 6, 8],
  'Tea Quality C - Bandarawela': [5, 4, 7, 6, 8, 9, 5, 8, 9, 7, 10, 11],
  'Tea Quality A - Nuwara': [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  'Tea Quality B - NuwaraEliya': [4, 7, 9, 6, 8, 10, 8, 11, 12, 13, 7, 9],

};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function BasicBars() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(allData);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const monthIndex = months.findIndex(month => month.toLowerCase().includes(term));
    if (monthIndex !== -1) {
      const newData = {};
      Object.keys(allData).forEach((series) => {
        newData[series] = [allData[series][monthIndex]];
      });
      setFilteredData(newData);
    } else {
      setFilteredData(allData); // Show all data if no match
    }
  };

  const xAxisLabels = months.map(month => 
    searchTerm.toLowerCase() === 'january' && month === 'January' ? 'Special Quality' : month
  );

  return (
    <div className="p-6 bg-gray-100">
      <div className="text-center text-2xl font-bold mb-4">Monthly Tea Quality Overview by Area</div>
      <div className="mb-4">
        <TextField
          label="Search by Month"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
      </div>
      <div className="flex justify-center">
        <BarChart
          xAxis={[{ data: xAxisLabels, scaleType: 'band' }]}
          series={Object.keys(filteredData).map((label, index) => ({
            data: months.map((_, monthIndex) => filteredData[label]?.[monthIndex] || 0),
            label,
            color: colors[index % colors.length],
          }))}
          width={1200}
          height={400}
        />
      </div>
    </div>
  );
}
