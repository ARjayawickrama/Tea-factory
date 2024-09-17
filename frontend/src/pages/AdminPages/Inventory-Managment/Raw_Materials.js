import React, { useEffect, useState } from 'react';
import { FaLeaf, FaEdit, FaTrash, FaDownload, FaBox, FaExclamationTriangle, FaList } from 'react-icons/fa';   
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
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5004/rawmaterials');
        const data = response.data;
        setMaterials(data);
        setLowStockItems(data.filter(item => item.weight < 20));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        body: `Please reorder ${selectedMaterial.materialName}.`
      });
      handleClosePopup();
    } catch (error) {
      console.error('Error sending email:', error);
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
        await axios.delete(`/api/rawmaterials/${id}`);
        // Handle successful deletion, e.g., update state or UI
        console.log('Material deleted successfully');
    } catch (error) {
        // Log error details for debugging
        console.error('Error deleting material:', error);
        // Display user-friendly message
        alert('An error occurred while deleting the material. Please try again.');
    }
};
  
  
  

  const handleEditClick = (material) => {
    setEditingMaterial(material);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5004/rawmaterials/${editingMaterial.id}`, editingMaterial);
      setMaterials(materials.map(material => material.id === editingMaterial.id ? editingMaterial : material));
      setLowStockItems(lowStockItems.map(item => item.id === editingMaterial.id ? editingMaterial : item));
      setEditingMaterial(null);
    } catch (error) {
      console.error('Error updating material:', error);
    }
  };

  const filteredMaterials = materials.filter((material) =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
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
            <div className="bg-gray-200 p-4 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:-translate-y-1 hover:shadow-lg w-full md:w-1/3">
              <FaList className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">View In Inventory</h3>
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
  <button onClick={() => handleEditClick(material)} className="text-yellow-600 hover:text-yellow-800">
    <FaEdit className="w-6 h-6" />
  </button>
  <button onClick={() => handleDelete(material.id)} className="text-red-600 hover:text-red-800">
    <FaTrash className="w-6 h-6" />
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reorder Popup */}
        {showReorderPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Reorder Materials</h3>
              <ul>
                {lowStockItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.materialName}</span>
                    <button 
                      onClick={() => handleReorderClick(item)} 
                      className="bg-blue-600 text-white py-1 px-2 rounded"
                    >
                      Reorder
                    </button>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setShowReorderPopup(false)} 
                className="mt-4 bg-red-600 text-white py-1 px-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Reorder Details Popup */}
        {showReorderDetailsPopup && selectedMaterial && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Reorder {selectedMaterial.materialName}</h3>
              <p className="mb-4">Supplier: {selectedMaterial.supplier}</p>
              <p className="mb-4">Email: {selectedMaterial.supplierEmail}</p>
              <button 
                onClick={handleSendToSupplier}
                className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
              >
                Send Request
              </button>
              <button 
                onClick={handleClosePopup}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
              {isLoading && <p className="mt-2 text-blue-600">Sending request...</p>}
            </div>
          </div>
        )}

        {/* Edit Material Popup */}
        {editingMaterial && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Edit Material</h3>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block mb-1">Material Name</label>
                  <input
                    type="text"
                    value={editingMaterial.materialName}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, materialName: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Stocked Date</label>
                  <input
                    type="date"
                    value={editingMaterial.stockedDate}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, stockedDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Weight</label>
                  <input
                    type="number"
                    value={editingMaterial.weight}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, weight: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Supplier</label>
                  <input
                    type="text"
                    value={editingMaterial.supplier}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, supplier: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Supplier Email</label>
                  <input
                    type="email"
                    value={editingMaterial.supplierEmail}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, supplierEmail: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => setEditingMaterial(null)} 
                    className="bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
