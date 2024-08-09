import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";
import axios from "axios";

export default function IssueMaintaining() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5004/supervise');
        console.log('API Response:', response.data);
        setRows(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    setRows([...rows, {
      machineName: "",
      machineID: "",
      image: "",
      Area: "",
      lastMaintenance: "",
      nextMaintenance: "",
      note: ""
    }]);
  };

  const handleUpdate = (index) => {
    // Implement update logic here
    console.log("Update row:", rows[index]);
  };

  const handleDelete = async (index) => {
    try {
      const id = rows[index]._id; // Assuming each row has an _id
      await axios.delete(`http://localhost:5004/supervise/${id}`);
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div className="flex">
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
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Area</th>
                  <th className="p-2 border">Last Maintenance</th>
                  <th className="p-2 border">Next Maintenance</th>
                  <th className="p-2 border">Note</th>
                  <th className="p-2 border w-36">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rows) && rows.map((row, index) => (
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
                        <img src={row.image} alt="Machine" className="w-16 h-16 object-cover" />
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
                        rows="1"
                      />
                    </td>

                    <td className="p-2 border text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleUpdate(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <MdEditDocument className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete className="w-6 h-6" />
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
