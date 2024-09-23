import React, { useEffect, useState } from 'react';
import { FaLeaf, FaEdit, FaTrash, FaDownload, FaBox, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { generatePDF } from './PDFReport';

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
    setSelectedMaterial(material);
    setShowReorderDetailsPopup(true);
  };

  const handleSendToSupplier = async () => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5004/send-email', {
        email: selectedMaterial.supplierEmail,
        subject: 'Reorder Request',
        body: `Please reorder ${selectedMaterial.materialName}.`,
      });
      handleClosePopup();
      Swal.fire('Success!', 'Reorder request sent!', 'success');
    } catch (error) {
      console.error('Error sending email:', error.response ? error.response.data : error.message);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to send reorder request.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClosePopup = () => {
    setShowReorderPopup(false);
    setShowReorderDetailsPopup(false);
    setSelectedMaterial(null);
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
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('Material before update:', editingMaterial);
    
    // Check for the correct ID property
    if (!editingMaterial?._id) {
      console.error("No ID found for updating material");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5004/rawmaterials/${editingMaterial._id}`, editingMaterial);
      console.log('Response:', response.data);
      // Continue with your success handling...
    } catch (error) {
      console.error("Error updating material", error.response.data);
      // Continue with your error handling...
    }
  };
  
  
  

  const filteredMaterials = materials.filter(material =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
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
              onClick={() => generatePDF(materials)}
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
                  <th className="border-b p-2">Material Name</th>
                  <th className="border-b p-2">Stocked Date</th>
                  <th className="border-b p-2">Weight</th>
                  <th className="border-b p-2">Supplier</th>
                  <th className="border-b p-2">Supplier Email</th>
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-100">
                    <td className="border-b p-2">{material.materialName}</td>
                    <td className="border-b p-2">{material.stockedDate}</td>
                    <td className="border-b p-2">{material.weight}</td>
                    <td className="border-b p-2">{material.supplier}</td>
                    <td className="border-b p-2">{material.supplierEmail}</td>
                    <td className="border-b p-2 flex space-x-2">
  <button onClick={() => handleEditClick(material)} className="bg-yellow-600 text-white py-1 px-2 rounded">
    <FaEdit />
  </button>
  <button onClick={() => handleDelete(material._id)} className="bg-red-600 text-white py-1 px-2 rounded">
    <FaTrash />
  </button>
  <button onClick={() => handleReorderClick(material)} className="bg-blue-600 text-white py-1 px-2 rounded">
    Reorder
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reorder Popup */}
        {showReorderDetailsPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Reorder {selectedMaterial?.materialName}</h2>
              <p>Are you sure you want to send a reorder request to {selectedMaterial?.supplier}?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={handleClosePopup}>Cancel</button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded"
                  onClick={handleSendToSupplier}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Material Popup */}
        {editingMaterial && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Material</h2>
              <input
                type="text"
                value={editingMaterial.materialName}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, materialName: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="date"
                value={editingMaterial.stockedDate}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, stockedDate: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                value={editingMaterial.weight}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, weight: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                value={editingMaterial.supplier}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, supplier: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="email"
                value={editingMaterial.supplierEmail}
                onChange={(e) => setEditingMaterial({ ...editingMaterial, supplierEmail: e.target.value })}
                className="w-full mb-2 p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => setEditingMaterial(null)}>Cancel</button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Update</button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
