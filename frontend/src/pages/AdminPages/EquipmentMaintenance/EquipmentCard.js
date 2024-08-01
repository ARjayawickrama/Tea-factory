import React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
];

export default function EquipmentCard() {
  return (
    <div className="grid grid-cols-3 gap-4 p-3">
      <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="text-6xl">👤</div>
          <div className="text-center text-teal-500  text-lg">Schedule Maintenance</div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="text-6xl">👤</div>
          <div className="text-center text-teal-500  text-lg">Issue Maintaining</div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white border h-36 w-96 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="text-6xl">👤</div>
          <div className="text-center text-teal-500 text-lg">Resource</div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl">
      <div className=" text-teal-500 mb-48 text-lg">Workin Area</div>
        <Stack direction="row" spacing={2} className=' relative right-12'>
          <PieChart
            series={[
              {
                paddingAngle: 5,
                innerRadius: 60,
                outerRadius: 80,
                data,
              },
            ]}
            margin={{ right: 5 }}
            width={200}
            height={200}
            legend={{ hidden: true }}
          />
        </Stack>
      </div>
      <div className="flex items-center justify-center bg-white border h-56 w-96 rounded-xl">
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-2">👤</div>
          <div className="text-center text-teal-500  text-lg">Technician Request</div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-white border p-4 h-56 w-96 rounded-xl">
        <div className="text-center text-teal-500 text-lg  relative bottom-4">Technician Request</div>
        <select className="w-full border p-1 mb-2 ">
          <option>Number Technician</option>
        </select>
        <select className="w-full border p-1 mb-2">
          <option>Area</option>
        </select>
        <select className="w-full border p-1 mb-2">
          <option>Employ Type</option>
        </select>
        <button className="bg-teal-500 text-white p-2 w-full">Send Employee Management</button>
      </div>
      <div className="col-span-3 flex flex-col bg-black text-white w-full p-1">
        <div className="text-center text-lg mb-2">Our Maintain Members</div>
      </div>
      <div className="col-span-3 flex flex-col overflow-y-auto max-h-96 relative bottom-6">
        <table className="w-full bg-white text-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Area</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Email Address</th>
              <th className="p-2 border">Repair Machine Type</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">Update</button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
