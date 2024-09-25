import React, { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaBox, FaList, FaDownload, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import UpdateProductModal from './UpdateProductModal';
import { generatePDF } from '../Inventory-Managment/PDFReport'; // Correct import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inventory_Management() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLowStockModal, setShowLowStockModal] = useState(false); // State to toggle low stock modal
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5004/InventoryProduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products.');
    }
  };

 

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5004/InventoryProduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNewStockClick = () => navigate('/Inventory_Form');
  const handleRawMaterialsClick = () => navigate('/Raw_Materials');

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product.');
      }
    }
  };

  const handleUpdate = (updatedProduct) => {
    if (updatedProduct && updatedProduct._id) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        )
      );
      setShowUpdateModal(false);
    } else {
      console.error('Updated product data is invalid');
    }
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter products for low stock (units less than 20)
  const lowStockProducts = products.filter(product => product.items < 20);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const handleDownloadReport = () => {
    generatePDF(products); // Call the generatePDF function with products
  };

  const closeLowStockModal = () => setShowLowStockModal(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Inventory Management</span>
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

        <div className="inventory-dashboard space-y-4">
          <div className="dashboard-header flex space-x-4 mb-4">
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <FaBox className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">Total Products</h3>
                <span className="text-2xl font-bold">{products.length}</span>
              </div>
            </div>
            <div
              className={`bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl ${showModal ? 'bg-amber-500' : ''}`}
              onClick={openModal}
            >
              <FaList className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">View In Inventory</h3>
              </div>
            </div>
            <div
              className="bg-red-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
              onClick={() => setShowLowStockModal(true)} // Open low stock modal on click
            >
              <FaExclamationTriangle className="w-8 h-8 text-grey-500" />
              <div>
                <h3 className="text-xl font-semibold">Low Stock</h3>
                <span className="text-2xl font-bold">{lowStockProducts.length}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
              onClick={handleNewStockClick}
            >
              <span>New Stock</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
            >
              <FaDownload className="w-5 h-5 inline-block mr-2" />
              <span>Download Report</span>
            </button>
          </div>

          <div className="inventory-list bg-white p-4 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Quick search"
              className="w-full p-2 mb-4 border rounded shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="w-full border-collapse bg-white shadow-md">
              <thead>
                <tr className="bg-green-800 text-white font-extrabold">
                  <th className="p-2 border-b text-center">Product</th>
                  <th className="p-2 border-b text-center">Manufacture Date</th>
                  <th className="p-2 border-b text-center">Expire Date</th>
                  <th className="p-2 border-b text-center">Weight</th>
                  <th className="p-2 border-b text-center">Units</th> {/* Column for Units */}
                  <th className="p-2 border-b text-center">Description</th>
                  <th className="p-2 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="p-2 border-b text-center">{product.product}</td>
                    <td className="p-2 border-b text-center">{product.manufactureDate}</td>
                    <td className="p-2 border-b text-center">{product.expireDate}</td>
                    
                    <td className="p-2 border-b text-center">{product.weight}</td>
                    <td className="p-2 border-b text-center">{product.items}</td> {/* Display Units */}
                    <td className="p-2 border-b text-center">{product.description}</td>
                    <td className="p-2 border-b text-center">
                      <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => handleEditClick(product)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteClick(product._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Modal */}
        {showLowStockModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-2/3">
              <h2 className="text-2xl font-bold mb-4">Low Stock Products</h2>
              <button className="text-red-600 absolute top-2 right-2" onClick={closeLowStockModal}>
                Close
              </button>
              <table className="w-full border-collapse bg-white shadow-md">
                <thead>
                  <tr className="bg-red-500 text-white font-extrabold">
                    <th className="p-2 border-b text-center">Product</th>
                    <th className="p-2 border-b text-center">Units</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="p-2 border-b text-center">{product.product}</td>
                      <td className="p-2 border-b text-center">{product.items}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

{showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          closeModal={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}
        <ToastContainer />
      </main>
    </div>
  );
}
