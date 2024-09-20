import React, { useState, useEffect } from "react";
import { FaUsers, FaEdit, FaTrash, FaBox, FaList, FaDownload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from './Modal';
import UpdateProductModal from './UpdateProductModal';
<<<<<<< HEAD
import generateProductPDF from './Product_PDFReport';
=======
import { generatePDF } from '../Inventory-Managment/PDFReport'; // Correct import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> 5f270e9f32ee0b2d2aafd90fdfcb4d4d6b016ad0

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

  const handleNewStockClick = () => navigate('/Inventory_Form');
  const handleRawMaterialsClick = () => navigate('/Raw_Materials');

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5004/InventoryProduct/${product._id}`);
          setProducts(products.filter((p) => p._id !== product._id));
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting product:', error);
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      }
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
    } else {
      console.error('Updated product data is invalid');
    }
  };

  const filteredProducts = products.filter(product =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleDownloadReport = () => {
    try {
      generateProductPDF(products);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const handleDownloadReport = () => {
    generatePDF(products); // Call the generatePDF function with products
  };

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
                  <th className="p-2 border-b">Product</th>
                  <th className="p-2 border-b">Manufacture Date</th>
                  <th className="p-2 border-b">Expire Date</th>
<<<<<<< HEAD
                  <th className="p-2 border-b">250g</th>
                  <th className="p-2 border-b">500g</th>
                  <th className="p-2 border-b">1kg</th>
                  <th className="p-2 border-b">Units</th>
=======
                  <th className="p-2 border-b">Weight</th>
                  <th className="p-2 border-b">Units</th> {/* Column for Units */}
>>>>>>> 5f270e9f32ee0b2d2aafd90fdfcb4d4d6b016ad0
                  <th className="p-2 border-b">Description</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
<<<<<<< HEAD
                    <td className="p-2">{product.product}</td>
                    <td className="p-2">{product.manufactureDate}</td>
                    <td className="p-2">{product.expireDate}</td>
                    <td className="p-2">{product.weight === '250g' ? product.units : '-'}</td>
                    <td className="p-2">{product.weight === '500g' ? product.units : '-'}</td>
                    <td className="p-2">{product.weight === '1kg' ? product.units : '-'}</td>
                    <td className="p-2">{product.units}</td>
                    <td className="p-2">{product.description}</td>
                    <td className="p-2">
=======
                    <td className="p-2 border-b">{product.product}</td>
                    <td className="p-2 border-b">{product.manufactureDate}</td>
                    <td className="p-2 border-b">{product.expireDate}</td>
                    <td className="p-2 border-b">{product.weight}</td>
                    <td className="p-2 border-b">{product.items}</td> {/* Display Units */}
                    <td className="p-2 border-b">{product.description}</td>
                    <td className="p-2 border-b">
>>>>>>> 5f270e9f32ee0b2d2aafd90fdfcb4d4d6b016ad0
                      <button
                        className="bg-yellow-600 text-white py-1 px-2 rounded mr-2"
                        onClick={() => handleEditClick(product)}
                      >
                        <FaEdit />
                      </button>
                      <button
<<<<<<< HEAD
                        onClick={() => handleDeleteClick(product)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
=======
                        className="bg-red-500 text-white py-1 px-2 rounded"
                        onClick={() => handleDeleteClick(product._id)}
>>>>>>> 5f270e9f32ee0b2d2aafd90fdfcb4d4d6b016ad0
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
<<<<<<< HEAD

        <UpdateProductModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          product={selectedProduct}
          onUpdate={handleUpdate}
        />

        <Modal show={showModal} onClose={closeModal} chartData={products} />
      </main>
=======
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
>>>>>>> 5f270e9f32ee0b2d2aafd90fdfcb4d4d6b016ad0
    </div>
  );
}


