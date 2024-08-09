import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEditDocument } from "react-icons/md";

export default function Schedule_Maintenance() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    {
      machineName: "",
      machineID: "",
      condition: "",
      lastMaintenance: "",
      nextMaintenance: "",
      note: "",
    },
  ]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [name]: value };
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        machineName: "",
        machineID: "",
        condition: "",
        lastMaintenance: "",
        nextMaintenance: "",
        note: "",
      },
    ]);
  };

  const handleUpdate = (index) => {
   
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="flex">
      
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li
              className="p-4 cursor-pointer hover:bg-teal-500 flex items-center"
              onClick={() => handleNavigation("/equipment")}
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>

     
      <main className="ml-64 p-6">
        <div className="flex flex-col">
     
          <div className="mt-4">
            <button
              className="bg-amber-500 w-24 h-10 rounded text-white"
              onClick={handleAddRow}
            >
              Add Row
            </button>
          </div>

          
          <div className="overflow-y-auto max-h-[600px] mt-4">
            <table className="w-full bg-white text-black border-collapse">
              <thead>
                <tr className="bg-stone-700 text-white">
                  <th className="p-2 border">Machine Name</th>
                  <th className="p-2 border">Machine ID</th>
                  <th className="p-2 border">Area</th>
                  <th className="p-2 border">Condition</th>
                  <th className="p-2 border">Last Maintenance Date</th>
                  <th className="p-2 border">Next Maintenance Date</th>
                  <th className="p-2 border">Note</th>
                  <th className="p-2 border w-36">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name="machineName"
                        placeholder="Machine Name"
                        value={row.machineName}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        name="machineID"
                        placeholder="M-1010"
                        value={row.machineID}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>

                    <td className="p-2 border">
                      <input
                        type="text"
                        name="Area"
                        placeholder="Area"
                        value={row.Area}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <div className="relative">
                        <select
                          name="condition"
                          value={row.condition}
                          onChange={(e) => handleInputChange(index, e)}
                          className={`w-full border rounded px-2 py-1 ${
                            row.condition === "good"
                              ? "bg-green-700"
                              : row.condition === "barely"
                              ? "bg-red-700"
                              : row.condition === "medium"
                              ? "bg-yellow-200"
                              : "bg-white"
                          }`}
                        >
                          <option value="">Select condition</option>
                          <option value="good">Good</option>
                          <option value="barely">Barely</option>
                          <option value="medium">Medium</option>
                        </select>
                      </div>
                    </td>

                    <td className="p-2 border">
                      <input
                        type="date"
                        name="lastMaintenance"
                        value={row.lastMaintenance}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="date"
                        name="nextMaintenance"
                        value={row.nextMaintenance}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2 border">
                      <textarea
                        name="note"
                        placeholder="Note"
                        value={row.note}
                        onChange={(e) => handleInputChange(index, e)}
                        className="w-full border rounded px-2 py-1"
                        rows="1" // Adjust the number of rows as needed
                      />
                    </td>
                    <td className="p-2 border text-center">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleUpdate(index)}>
                          <MdEditDocument className="w-14 h-10" />
                        </button>
                        <button onClick={() => handleDelete(index)}>
                          <MdDelete className="w-14 h-10" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
