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
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Email sent successfully',
      });
      handleClosePopup();
    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send email',
      });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleClosePopup = () => {
    setShowReorderPopup(false);
    setShowReorderDetailsPopup(false);
    setSelectedMaterial(null);
  };

  const filteredMaterials = materials.filter((material) =>
    material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter materials based on search query

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

        <div className="materials-dashboard">
          <div className="dashboard-header flex justify-between mb-4">
            <div className="dashboard-item bg-gray-200 p-4 rounded flex items-center space-x-2">
              <FaBox className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Total Raw Materials</h3>
                <span>{materials.length}</span>
              </div>
            </div>
            <div 
              className="dashboard-item bg-red-200 p-4 rounded flex items-center cursor-pointer space-x-2"
              onClick={() => setShowReorderPopup(true)}
            >
              <FaExclamationTriangle className="w-6 h-6 text-gray-600" />
              <div className=''>
                <h3 className="text-lg font-semibold">Low Stock</h3>
                <span>{lowStockItems.length}</span>
              </div>
              
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded flex items-center space-x-2">
              <FaList className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">View In Inventory</h3>
              </div>
            </div>
            
          </div>

          <div className="flex space-x-4 mb-4b mb-4">
            <button 
              onClick={handleRequestMaterials} 
              className="bg-green-600 text-white py-2 px-4 rounded"
            >
              Request Materials
            </button>
            <button
                onClick={() => generatePDF(materials)}
                className="bg-green-600 text-white py-2 px-4 rounded"
              >
                <FaDownload className="w-5 h-5 inline-block mr-2" />
                Download Report
              </button>
          </div>

          <div className="materials-list">
            <input 
              type="text" 
              placeholder="Quick search" 
              className="w-full p-2 mb-4 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Material Name</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Stocked Date</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Weight</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Supplier</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Supplier Email</th>
                  <th className="border-b p-2 bg-green-800 text-white font-extrabold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr key={material.id}>
                    <td className="border-b p-2">{material.materialName}</td>
                    <td className="border-b p-2">{material.stockedDate}</td>
                    <td className="border-b p-2">{material.weight}</td>
                    <td className="border-b p-2">{material.supplier}</td>
                    <td className="border-b p-2">{material.supplierEmail}</td>
                    <td className="border-b p-2 flex space-x-2">
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <FaEdit className="w-6 h-6" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showReorderPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Low Stock Items</h2>
            <ul className="mb-4">
              {lowStockItems.map(item => (
                <li 
                  key={item.id} 
                  className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleReorderClick(item)}
                >
                  {item.materialName} - {item.weight}kg
                </li>
              ))}
            </ul>
            <button 
              onClick={handleClosePopup}
              className="bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showReorderDetailsPopup && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Reorder Details</h2>
            <p className="mb-2">Material Name: {selectedMaterial.materialName}</p>
            <p className="mb-2">Supplier: {selectedMaterial.supplier}</p>
            <p className="mb-2">Supplier Email: {selectedMaterial.supplierEmail}</p>
            <button
              onClick={handleSendToSupplier}
              className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
              disabled={isLoading} 
            >
              {isLoading ? 'Sending...' : 'Send To Supplier'}
            </button>
            <button
              onClick={handleClosePopup}
              className="bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
