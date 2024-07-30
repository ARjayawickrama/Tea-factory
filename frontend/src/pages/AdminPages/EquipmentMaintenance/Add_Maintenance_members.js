import React from "react";

export default function AddMaintenanceMembers() {
  return (
    <div className="min-w-96 max-w-screen-sm relative top-40">
      <div className="left-64 mr-20 bg-white rounded-xl shadow-sm h-96 w-2/7">
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
          <p className="text-white text-lg ml-32">Technician Request</p>
        </div>

        <div className="overflow-auto h-[calc(100%-4rem)]">
          {/* Adjusted height to ensure scrolling */}
          <table className="w-64 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-1">Number Technician</th>
                <th className="border border-gray-300 p-2">Area</th>
                <th className="border border-gray-300 p-2">Employ type</th>
                <th className="border border-gray-300 p-2">Registration date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    className="w-36 border-2 border-green-700"
                    type="number"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select className="w-20 h-12">
                    <option value="0">Area</option>
                    <option value="1">Kandy</option>
                    <option value="2">Dimbula</option>
                    <option value="4">Akuressa</option>
                    <option value="5">Deniyaya</option>
                    <option value="6">Bandarawela</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <select>
                    <option value="0">Machine Types</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                    <option value="7">Land Rover</option>
                    <option value="8">Mercedes</option>
                    <option value="9">Mini</option>
                    <option value="10">Nissan</option>
                    <option value="11">Toyota</option>
                    <option value="12">Volvo</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <input className="w-32" type="date" min="18" max="50" />
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="border border-gray-300 p-2">
                  <button className="bg-emerald-700 text-white w-full py-2 hover:scale-105">
                    Send Employee Management
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-2 right-0 mt-12 bg-slate-900 rounded-xl shadow-sm h-16 flex items-center">
            <span
              className="text-yellow-500 mr-2 w-16 h-16 flex items-center justify-center"
              style={{
                fontSize: "3rem",
                position: "relative",
                left: "80px",
                bottom: "6px",
              }}
            ></span>
            <p className="text-white text-lg ml-20"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
