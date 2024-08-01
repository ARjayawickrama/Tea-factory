import React, { useState } from 'react';

export default function ShowMaintenanceMembers() {
  

  return (
    <div>
      <div className="col-span-3 flex flex-col bg-black text-white w-full p-1">
        <div className="text-center text-lg mb-9">Our Maintain Members</div>
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
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-2 border">John Doe</td>
              <td className="p-2 border">Area 1</td>
              <td className="p-2 border">123-456-7890</td>
              <td className="p-2 border">john@example.com</td>
              <td className="p-2 border">Type A</td>
              <td className="p-2 border">
                <button className="bg-blue-400 text-white px-2 py-1 m-1">
                  Update
                </button>
                <button className="bg-red-500 text-white px-2 py-1 m-1">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
 
    </div>
  );
}
