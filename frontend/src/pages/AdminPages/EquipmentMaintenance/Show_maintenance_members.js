import React, { useState } from 'react';

export default function ShowMaintenanceMembers() {
  

  return (
    <div>
      <div className="absolute right-6 mt-16 bg-white rounded-xl shadow-sm w-2/4">
        <div className="p-2 right-0 mt-7 bg-slate-900 rounded-xl shadow-sm h-16 flex items-center">
          <span
            className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
            style={{
              fontSize: "3rem",
              position: "relative",
              left: "80px",
              bottom: "6px",
            }}
          >
            🧑‍🔧
          </span>
          <p className="text-white text-lg ml-32">Our Maintaining Members</p>
        </div>

        <div className="overflow-auto">
          <div className="overflow-x-auto overflow-y-auto max-h-80">
            <div className="overflow-x-auto overflow-y-clip h-96">
              {/* Table Start */}
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Header 1</th>
                    <th className="border border-gray-300 p-2">Header 2</th>
                    <th className="border border-gray-300 p-2">Header 3</th>
                    <th className="border border-gray-300 p-2">Header 4</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Row 1 Col 1</td>
                    <td className="border border-gray-300 p-2">Row 1 Col 2</td>
                    <td className="border border-gray-300 p-2">Row 1 Col 3</td>
                    <td className="border border-gray-300 p-2">Row 1 Col 4</td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-blue-500 text-white p-1 rounded mr-2">
                        Update
                      </button>
                      <button className="bg-red-500 text-white p-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Table End */}
            </div>
          </div>
        </div>

        <div className="p-2 right-0 mt-7 bg-slate-900 rounded-xl shadow-sm h-16 flex items-center">
          <span
            className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
            style={{
              fontSize: "3rem",
              position: "relative",
              left: "80px",
              bottom: "6px",
            }}
          ></span>
          <p className="text-white text-lg ml-20">
            
          </p>
        </div>
      </div>

 
    </div>
  );
}
