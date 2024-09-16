import React, { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaDownload, FaBox, FaExclamationTriangle, FaList } from "react-icons/fa";  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';

export default function Inventory_Management() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const [hoveredItem, setHoveredItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5004/InventoryProduct');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNewStockClick = () => {
    navigate('/Inventory_Form');  
  };

  const handleRawMaterialsClick = () => {
    navigate('/Raw_Materials');  
  };

  const handleEditClick = (product) => {
    navigate('/Inventory_Form', { state: { product } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateClick = async (id, formData) => {
    try {
      await axios.put(`http://localhost:5004/InventoryProduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts(products.map((product) => 
        product._id === id ? { ...product, ...formData } : product
      ));
      setEditingItemId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDownloadClick = () => {
    console.log("Download button clicked");
  };

  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              <FaUsers className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Inventory...</span>
            </li>
            <li
              className={`p-4 cursor-pointer mt-9 flex items-center ${hoveredItem === 'raw' ? 'bg-amber-500' : 'bg-stone-800'}`}
              onMouseEnter={() => setHoveredItem('raw')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={handleRawMaterialsClick}
            >
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Raw Materials</span>  
            </li>
          </ul>
        </nav>
      </div>
      
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Details</h1>

        <div className="inventory-dashboard">
          <div className="dashboard-header flex justify-between mb-4">
            <div className="dashboard-item bg-gray-200 p-4 rounded flex items-center space-x-2">
              <FaBox className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Total Products</h3>
                <span>{products.length}</span>
              </div>
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded flex items-center space-x-2">
              <FaExclamationTriangle className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">Low Stock</h3>
                <span>{products.filter(product => product.units < 10).length}</span>
              </div>
            </div>
            <div className="dashboard-item bg-gray-200 p-4 rounded flex items-center space-x-2">
              <FaList className="w-6 h-6 text-gray-600" />
              <div>
                <h3 className="text-lg font-semibold">View In Inventory</h3>
              </div>
            </div>
            
            <button onClick={handleDownloadClick}>
              <FaDownload className="w-5 h-5 mr-2" />
            </button>
          </div>
          
          <div className="flex space-x-4 mb-4">
            <button 
              className="bg-green-600 text-white py-2 px-4 rounded" 
              onClick={handleNewStockClick}
            >
              New Stock
            </button>
          </div>

          <div className="inventory-list">
            <input 
              type="text" 
              placeholder="Quick search" 
              className="w-full p-2 mb-4 border rounded" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-800 text-white font-extrabold">
                  <th className="border-b p-2">Product ID</th>
                  <th className="border-b p-2">Product</th>
                  <th className="border-b p-2">Manufacture Date</th>
                  <th className="border-b p-2">Expire Date</th>
                  <th className="border-b p-2">Weight</th>
                  <th className="border-b p-2">Units</th>
                  <th className="border-b p-2">Description</th>  
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="border-b p-2">#{product._id}</td>
                    <td className="border-b p-2">{product.product}</td>
                    <td className="border-b p-2">{product.manufactureDate}</td>
                    <td className="border-b p-2">{product.expireDate}</td>
                    <td className="border-b p-2">{product.weight}</td>
                    <td className="border-b p-2">{product.units}</td>
                    <td className="border-b p-2">{product.description}</td>  
                    <td className="border-b p-2 flex space-x-2">
                      <button 
                        className="text-yellow-600 hover:text-yellow-800"
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit className="w-6 h-6" title="Edit" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteClick(product._id)}
                      >
                        <FaTrash className="w-6 h-6" title="Delete" />
                      </button>
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
