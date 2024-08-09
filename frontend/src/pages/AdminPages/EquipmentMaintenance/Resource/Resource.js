import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";

export default function Resource() {
  const [rows, setRows] = useState([
    {
      machineName: "Example Machine",
      machineID: "M-0001",
      image: "",
      Area: "Example Area",
      lastMaintenance: "2024-01-01",
      nextMaintenance: "2024-07-01",
      note: "Example note",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [name]: value };
    setRows(newRows);
  };

  const handleImageChange = (index, event) => {
    const newRows = [...rows];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newRows[index] = { ...newRows[index], image: reader.result };
        setRows(newRows);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        machineName: "",
        machineID: "",
        image: "",
        Area: "",
        lastMaintenance: "",
        nextMaintenance: "",
        note: "",
      },
    ]);
  };

  const handleUpdate = (index) => {
    // Implement update logic
  };

  const handleDelete = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.machineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.Area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex ">
      <div className="fixed top-0 left-0 h-full bg-stone-800 text-white w-64">
        <nav>
          <ul>
            <li className="p-4 cursor-pointer hover:bg-teal-500 flex items-center bg-teal-500 mt-6">
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Equipment</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className="ml-64 p-6">
        <div className="flex flex-col">
          <div className="mb-4">
            <button
              className="bg-amber-500 w-24 h-10 rounded text-white"
              onClick={handleAddRow}
            >
              Add Row
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div className="overflow-y-auto max-h-[600px] mt-4">
            <table className="w-full bg-white text-black border-collapse ">
              <thead>
                <tr className="bg-stone-700 text-white">
                  <th className="p-2 border">Machine Name</th>
                  <th className="p-2 border">Machine ID</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Area</th>
                  <th className="p-2 border w-36">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
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
                      {row.image ? (
                        <img
                          src={row.image}
                          alt="Machine"
                          className="w-96 object-cover"
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e)}
                          className="w-full border rounded px-2 py-1"
                        />
                      )}
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
