import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts'; // Import BarChart from MUI charts
import axios from 'axios';

const DataChart = () => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5004/supervise");
        const data = response.data;

        // Calculate the count of machines with 'Enabled' status
        const enabledCount = data.filter(item => item.MachineStatus === 'Enabled').length;
        const disabledCount = data.filter(item => item.MachineStatus === 'Disabled').length;

        // Print both Enabled and Disabled machines count to the console
        console.log("Enabled Machines Count:", enabledCount);
        console.log("Disabled Machines Count:", disabledCount);

        // Calculate the total count
        const totalCount = data.length;

        // Prepare data for the BarChart
        const barData = [enabledCount, disabledCount, totalCount];

        setBarChartData(barData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Machine Status</h2>
      
      {/* Bar Chart */}
      <div className="col-span-4 p-4 rounded-lg">
        <p className="text-lg font-semibold mb-2">Machine Status Overview</p>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Machine Enabled", "Machine Disabled", "All Machines"],
            },
          ]}
          series={[{ data: barChartData }]}
          width={700}
          height={400}
        />
      </div>
    </div>
  );
};

export default DataChart;
