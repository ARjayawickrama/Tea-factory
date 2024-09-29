import React, { useEffect, useState } from "react";
import {
  FaLeaf,
  FaEdit,
  FaTrash,
  FaDownload,
  FaBox,
  FaExclamationTriangle,
  FaList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import generateRawPDF from "../Inventory-Managment/Raw_PDFReport";

export default function Raw_Materials() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showReorderPopup, setShowReorderPopup] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showReorderDetailsPopup, setShowReorderDetailsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:5004/rawmaterials");
      const data = response.data;
      setMaterials(data);
      setLowStockItems(data.filter((item) => item.weight < 20));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setError("Failed to load materials");
      setLoading(false);
    }
  };

  const handleRequestMaterials = () => {
    navigate("/addrawmaterials");
  };

  const handleReorderClick = (material) => {
    setSelectedMaterial(material);
    setShowReorderDetailsPopup(true);
  };
  const handleSendToSupplier = async () => {
    // Check if selectedMaterial and its supplierEmail are defined
    if (!selectedMaterial || !selectedMaterial.supplierEmail) {
      console.error("Supplier email is not available.");
      Swal.fire(
        "Error!",
        "No supplier email available to send the reorder request.",
        "error"
      );
      return; // Exit the function if there's no email
    }

    setIsLoading(true);
    try {
      // Proceed to send email
      await axios.post("http://localhost:5004/send-email", {
        email: selectedMaterial.supplierEmail, // Use supplierEmail from selectedMaterial
        subject: "Reorder Request",
        body: `Please reorder ${selectedMaterial.materialName}.`,
      });

      handleClosePopup(); // Close the popup after sending
      Swal.fire("Sent!", "Reorder request sent to supplier.", "success");
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error!", "Failed to send reorder request.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowReorderPopup(false);
    setShowReorderDetailsPopup(false);
    setSelectedMaterial(null);
    setEditingMaterial(null);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        // Proceed with delete if user confirms
        await axios.delete(`http://localhost:5004/rawmaterials/${id}`);
        fetchMaterials(); // Refresh the materials list
        Swal.fire("Deleted!", "Material deleted successfully.", "success");
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      Swal.fire(
        "Error!",
        "Failed to delete material. Please try again.",
        "error"
      );
    }
  };

  const handleEditClick = (material) => {
    setEditingMaterial(material);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5004/rawmaterials/${editingMaterial._id}`,
        editingMaterial
      );
      Swal.fire("Updated!", "Material updated successfully.", "success");
      fetchMaterials();
      handleClosePopup();
    } catch (error) {
      console.error("Error updating material", error);
      Swal.fire(
        "Error!",
        "Failed to update material. Please try again.",
        "error"
      );
    }
  };

  const filteredMaterials = materials.filter((material) =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaLeaf className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Raw Materials</span>
            </li>
          </ul>
        </nav>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Raw Materials Details
        </h1>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:-translate-y-1 hover:shadow-lg w-full md:w-1/3">
              <FaBox className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Total Raw Materials</h3>
                <span className="text-xl font-bold">{materials.length}</span>
              </div>
            </div>
            <div
              className="bg-red-200 p-4 rounded-lg shadow-md flex items-center space-x-2 cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg w-full md:w-1/3"
              onClick={() => setShowReorderPopup(true)}
            >
              <FaExclamationTriangle className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Low Stock</h3>
                <span className="text-xl font-bold">
                  {lowStockItems.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleRequestMaterials}
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
            >
              <span>Request Materials</span>
            </button>
            <button
              onClick={() => generateRawPDF(materials)}
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
            >
              <FaDownload className="w-5 h-5 inline-block mr-2" />
              <span>Download Report</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Quick search"
              className="w-full p-2 mb-4 border rounded shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-green-800 text-white font-extrabold">
                  <th className="border-b p-2 border">Material Name</th>
                  <th className="border-b p-2 border">Stocked Date</th>
                  <th className="border-b p-2 border">Weight</th>
                  <th className="border-b p-2 border">Supplier Manager</th>
                  <th className="border-b p-2 border">Supplier Email</th>
                  <th className="border-b p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-100">
                    <td className="border-b p-2 border">
                      {material.materialName}
                    </td>
                    <td className="border-b p-2 border">
                      {material.stockedDate}
                    </td>
                    <td className="border-b p-2 border">{material.weight}kg</td>
                    <td className="border-b p-2 border">{material.supplier}</td>
                    <td className="border-b p-2 border">
                      {material.supplierEmail}
                    </td>
                    <td className="border-b p-2  space-x-2">
                      <button onClick={() => handleEditClick(material)}>
                        <FaEdit className="text-blue-600 hover:text-blue-800 " />
                      </button>
                      <button onClick={() => handleDelete(material._id)}>
                        <FaTrash className="text-red-600 hover:text-red-800" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showReorderPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-bold mb-4">Low Stock Items</h2>
                <ul className="mb-4">
                  {lowStockItems.map((item) => (
                    <li key={item.id} className="flex justify-between mb-2">
                      <span>
                        {item.materialName} (Stock: {item.weight}kg)
                      </span>
                      <button
                        onClick={() => handleReorderClick(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Reorder
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleClosePopup}
                  className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Reorder Details Popup */}
          {showReorderDetailsPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-lg font-bold mb-4">Reorder Details</h2>
                <p className="mb-2">
                  Reordering: {selectedMaterial.materialName}
                </p>
                <div className="mb-4">
                  <label className="block mb-1">Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Special Notes:</label>
                  <textarea
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="border p-2 w-full"
                    rows="3"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleSendToSupplier}
                    className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reorder"}
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit & Reorder Details Popup */}
          {editingMaterial && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Edit Material Details</h2>
                <form onSubmit={handleUpdate}>
                  {/* Material Name */}
                  <div className="mb-4">
                    <label className="block mb-1">Material Name</label>
                    <input
                      type="text"
                      value={editingMaterial.materialName}
                      onChange={(e) =>
                        setEditingMaterial({
                          ...editingMaterial,
                          materialName: e.target.value,
                        })
                      }
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Stocked Date */}
                  <div className="mb-4">
                    <label className="block mb-1">Stocked Date</label>
                    <input
                      type="date"
                      value={editingMaterial.stockedDate}
                      onChange={(e) =>
                        setEditingMaterial({
                          ...editingMaterial,
                          stockedDate: e.target.value,
                        })
                      }
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Weight */}
                  <div className="mb-4">
                    <label className="block mb-1">Weight</label>
                    <input
                      type="number"
                      value={editingMaterial.weight}
                      onChange={(e) =>
                        setEditingMaterial({
                          ...editingMaterial,
                          weight: e.target.value,
                        })
                      }
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Supplier Name */}
                  <div className="mb-4">
                    <label className="block mb-1">Supplier Name</label>
                    <input
                      type="text"
                      value={editingMaterial.supplier}
                      onChange={(e) =>
                        setEditingMaterial({
                          ...editingMaterial,
                          supplier: e.target.value,
                        })
                      }
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Supplier Email */}
                  <div className="mb-4">
                    <label className="block mb-1">Supplier Email</label>
                    <input
                      type="email"
                      value={editingMaterial.supplierEmail}
                      onChange={(e) =>
                        setEditingMaterial({
                          ...editingMaterial,
                          supplierEmail: e.target.value,
                        })
                      }
                      required
                      className="border p-2 w-full"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleClosePopup}
                      className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Update Material
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
