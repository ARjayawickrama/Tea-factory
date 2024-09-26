import React, { useEffect, useState } from 'react';
import { FaLeaf, FaEdit, FaTrash, FaDownload, FaBox, FaExclamationTriangle, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import generateRawPDF  from '../Inventory-Managment/Raw_PDFReport';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5004/rawmaterials');
      const data = response.data;
      setMaterials(data);
      setLowStockItems(data.filter(item => item.weight < 20));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching materials:', error);
      setError('Failed to load materials');
      setLoading(false);
    }
  };

  const handleRequestMaterials = () => {
    navigate('/addrawmaterials');
  };
  
  const handleReorderClick = (material) => {
    console.log('Reordering material:', material); // Add this line
    setSelectedMaterial(material);
    setShowReorderPopup(true);
  };
  

  const handleSendToSupplier = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5004/send-email', {
        email: selectedMaterial.supplierEmail,
        subject: 'Reorder Request',
        body: `Please reorder ${selectedMaterial.materialName}.`
      });
      handleClosePopup();
      Swal.fire('Sent!', 'Reorder request sent to supplier.', 'success');
    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire('Error!', 'Failed to send reorder request.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleClosePopup = () => {
    setShowReorderPopup(false);
    setShowReorderDetailsPopup(false);
    setSelectedMaterial(null);
    setEditingMaterial(null); // Reset editing material
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/rawmaterials/${id}`);
      fetchMaterials();
      Swal.fire('Deleted!', 'Material deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting material:', error);
      Swal.fire('Error!', 'Failed to delete material. Please try again.', 'error');
    }
  };

  const handleEditClick = (material) => {
    setEditingMaterial(material);
    setShowReorderDetailsPopup(true); // Show the edit popup
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5004/rawmaterials/${editingMaterial._id}`, editingMaterial);
      Swal.fire('Updated!', 'Material updated successfully.', 'success');
      fetchMaterials(); // Refresh materials after update
      handleClosePopup(); // Close the popup after update
    } catch (error) {
      console.error("Error updating material", error);
      Swal.fire('Error!', 'Failed to update material. Please try again.', 'error');
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaLeaf className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Raw Materials</span>
            </li>
          </ul>
        </nav>
      </div>

      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Raw Materials Details</h1>

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
                <span className="text-xl font-bold">{lowStockItems.length}</span>
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
                    <td className="border-b p-2 border">{material.materialName}</td>
                    <td className="border-b p-2 border">{material.stockedDate}</td>
                    <td className="border-b p-2 border">{material.weight}kg</td>
                    <td className="border-b p-2 border">{material.supplier}</td>
                    <td className="border-b p-2 border">{material.supplierEmail}</td>
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

          {/* Reorder Popup */}
          {showReorderPopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Reorder Material</h2>
                <p>Material Name: {selectedMaterial?.materialName}</p>
                <div className="flex justify-end mt-4">
                  <button onClick={handleClosePopup} className="bg-gray-300 py-2 px-4 rounded mr-2">Cancel</button>
                  <button onClick={handleSendToSupplier} className={`bg-blue-600 text-white py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send to Supplier'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Material Popup */}
        {showReorderDetailsPopup && editingMaterial && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Edit Material</h2>
      
      {/* Material Name */}
      <div className="mb-4">
  <label className="block mb-1">Material Name</label>
  <select
    value={editingMaterial.materialName}
    onChange={(e) => setEditingMaterial({ ...editingMaterial, materialName: e.target.value })}
    required
    className="border p-2 w-full"
  >
    <option value="">Select Material</option>
    {[
      'Black Tea Leaves',
      'Cartons and Boxes',
      'Green Tea Leaves',
      'Labels and Branding Stickers',
      'Natural Essences',
      'Oolong Tea Leaves',
      'Pouches',
      'Spices',
      'Tea Bags',
    ].map((material) => (
      <option key={material} value={material}>
        {material}
      </option>
    ))}
  </select>
  {!editingMaterial.materialName && (
    <span className="text-red-500">Material name is required</span>
  )}
</div>

      
      {/* Stocked Date */}
      <div className="mb-4">
        <label className="block mb-1">Stocked Date</label>
        <input
          type="date"
          value={editingMaterial.stockedDate}
          onChange={(e) => setEditingMaterial({ ...editingMaterial, stockedDate: e.target.value })}
          required
          className="border p-2 w-full"
        />
        {!editingMaterial.stockedDate && (
          <span className="text-red-500">Stocked date is required</span>
        )}
      </div>
      
      {/* Weight with Validation */}
      <div className="mb-4">
        <label className="block mb-1">Weight</label>
        <input
          type="number"
          value={editingMaterial.weight}
          onChange={(e) => setEditingMaterial({ ...editingMaterial, weight: e.target.value })}
          min="1" // Add min value for validation
          required
          className="border p-2 w-full"
        />
        {(editingMaterial.weight < 1 || !editingMaterial.weight) && (
          <span className="text-red-500">Weight must be at least 1</span>
        )}
      </div>

      {/* Supplier Name */}
      <div className="mb-4">
        <label className="block mb-1">Supplier Manager</label>
        <input
          type="text"
          value={editingMaterial.supplier}
          onChange={(e) => setEditingMaterial({ ...editingMaterial, supplier: e.target.value })}
          required
          className="border p-2 w-full"
        />
        {!editingMaterial.supplier && (
          <span className="text-red-500">Supplier name is required</span>
        )}
      </div>
      
      {/* Supplier Email with Validation */}
      <div className="mb-4">
        <label className="block mb-1">Supplier Email</label>
        <input
          type="email"
          value={editingMaterial.supplierEmail}
          onChange={(e) => setEditingMaterial({ ...editingMaterial, supplierEmail: e.target.value })}
          required
          className="border p-2 w-full"
        />
        {!/\S+@\S+\.\S+/.test(editingMaterial.supplierEmail) && (
          <span className="text-red-500">Valid email is required</span>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button onClick={handleClosePopup} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Update Material</button>
      </div>
    </form>
  </div>
)}

        </div>
      </main>
    </div>
  );
}
