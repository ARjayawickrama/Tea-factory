import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
import { FaUsers, FaEdit, FaTrash, FaBox, FaList, FaDownload, FaExclamationTriangle } from "react-icons/fa";
=======
import { FaUsers, FaEdit, FaTrash, FaBox, FaList } from "react-icons/fa";
>>>>>>> Stashed changes
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import UpdateProductModal from './UpdateProductModal';
import { generatePDF } from '../Inventory-Managment/PDFReport';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import styles

export default function Inventory_Management() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< Updated upstream
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
=======
>>>>>>> Stashed changes
  const navigate = useNavigate();

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

<<<<<<< Updated upstream
  const handleNewStockClick = () => navigate('/Inventory_Form');
  const handleRawMaterialsClick = () => navigate('/Raw_Materials');
=======
  const handleNewStockClick = () => {
    navigate('/Inventory_Form');
  };

  const handleRawMaterialsClick = () => {
    navigate('/Raw_Materials');
  };
>>>>>>> Stashed changes

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

<<<<<<< Updated upstream
  const handleDeleteClick = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
              setProducts(products.filter((product) => product._id !== id));
              toast.success('Product deleted successfully!');
            } catch (error) {
              console.error('Error deleting product:', error);
              toast.error('Failed to delete product.');
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
      closeOnClickOutside: true,
      closeOnEscape: true,
    });
  };

  const handleUpdate = (updatedProduct) => {
    if (updatedProduct && updatedProduct._id) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        )
      );
      setShowUpdateModal(false);
      toast.success('Product updated successfully!');
    } else {
      console.error('Updated product data is invalid');
=======
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
>>>>>>> Stashed changes
    }
  };

  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

<<<<<<< Updated upstream
  // Filter low stock products
  const lowStockProducts = products.filter(product => product.items < 20);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDownloadReport = () => {
    generatePDF(products);
    toast.success('Report downloaded successfully!');
  };

=======
>>>>>>> Stashed changes
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

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
<<<<<<< Updated upstream

            <div className={`bg-red-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl`}>
              <FaExclamationTriangle className="w-8 h-8 text-grey" />
              <div>
                <h3 className="text-xl font-semibold text-grey">Low Stock</h3>
                <span className="text-2xl font-bold text-grey">{lowStockProducts.length}</span>
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
=======
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <FaList className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">View In Inventory</h3>
              </div>
            </div>
>>>>>>> Stashed changes
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
              onClick={handleNewStockClick}
            >
              <span>New Stock</span>
<<<<<<< Updated upstream
            </button>
            <button
              onClick={handleDownloadReport}
              className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700 flex items-center space-x-2"
            >
              <FaDownload className="w-5 h-5 inline-block mr-2" />
              <span>Download Report</span>
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  <th className="p-2 border-b">Product</th>
                  <th className="p-2 border-b">Manufacture Date</th>
                  <th className="p-2 border-b">Expire Date</th>
                  <th className="p-2 border-b">Weight</th>
                  <th className="p-2 border-b">Units</th>
                  <th className="p-2 border-b">Description</th>
                  <th className="p-2 border-b">Action</th>
=======
                  <th className="border-b p-2">Product</th>
                  <th className="border-b p-2">Manufacture Date</th>
                  <th className="border-b p-2">Expire Date</th>
                  <th className="border-b p-2">Weight</th>
                  <th className="border-b p-2">Units</th>
                  <th className="border-b p-2">Description</th>
                  <th className="border-b p-2">Action</th>
>>>>>>> Stashed changes
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
<<<<<<< Updated upstream
                  <tr key={product._id}>
                    <td className="p-2 border-b">{product.product}</td>
                    <td className="p-2 border-b">{product.manufactureDate}</td>
                    <td className="p-2 border-b">{product.expireDate}</td>
                    <td className="p-2 border-b">{product.weight}</td>
                    <td className="p-2 border-b">{product.items}</td>
                    <td className="p-2 border-b">{product.description}</td>
                    <td className="p-2 border-b">
                      <button
                        className="bg-yellow-600 text-white py-1 px-2 rounded mr-2"
=======
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td className="border-b p-2">{product.product}</td>
                    <td className="border-b p-2">{product.manufactureDate}</td>
                    <td className="border-b p-2">{product.expireDate}</td>
                    <td className="border-b p-2">{product.weight}</td>
                    <td className="border-b p-2">{product.units}</td>
                    <td className="border-b p-2">{product.description}</td>
                    <td className="border-b p-2 flex space-x-2">
                      <button
                        className="text-yellow-600 hover:text-yellow-800"
>>>>>>> Stashed changes
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit />
                      </button>
                      <button
<<<<<<< Updated upstream
                        className="bg-red-500 text-white py-1 px-2 rounded"
=======
                        className="text-red-600 hover:text-red-800"
>>>>>>> Stashed changes
                        onClick={() => handleDeleteClick(product._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <Modal closeModal={closeModal} />
      )}

      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          closeModal={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      <ToastContainer />
    </div>
  );
}
