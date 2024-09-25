import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaEdit,
  FaTrash,
  FaBox,
  FaList,
  FaDownload,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import UpdateProductModal from "./UpdateProductModal";
import { generatePDF } from "../Inventory-Managment/PDFReport"; // Correct import
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Inventory_Management() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLowStockModal, setShowLowStockModal] = useState(false); // State to toggle low stock modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5004/InventoryProduct");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Navigation handlers
  const handleNewStockClick = () => navigate("/Inventory_Form");
  const handleRawMaterialsClick = () => navigate("/Raw_Materials");

  // Modal and Product Handling
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
      }
    }
  };

  const handleUpdate = (updatedProduct) => {
    if (updatedProduct && updatedProduct._id) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod))
      );
      setShowUpdateModal(false);
    } else {
      console.error("Updated product data is invalid");
    }
  };

  // Filter products based on the search term and low stock criteria
  const filteredProducts = products.filter((product) =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter((product) => product.items < 20);

  // Modal toggle functions
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const closeLowStockModal = () => setShowLowStockModal(false);

  // Loading and error handling
  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  // PDF Report Generation
  const handleDownloadReport = () => {
    generatePDF(products); // Call the generatePDF function with products
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <li className="p-4 cursor-pointer bg-amber-500 mt-9 flex items-center">
              <FaUsers className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Inventory Management</span>
            </li>
            <li
              className={`p-4 cursor-pointer mt-9 flex items-center ${
                hoveredItem === "raw" ? "bg-amber-500" : "bg-stone-800"
              }`}
              onMouseEnter={() => setHoveredItem("raw")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={handleRawMaterialsClick}
            >
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Raw Materials</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Details</h1>

        <div className="inventory-dashboard space-y-4">
          <div className="dashboard-header flex space-x-4 mb-4">
            {/* Total Products Card */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <FaBox className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">Total Products</h3>
                <span className="text-2xl font-bold">{products.length}</span>
              </div>
            </div>

            {/* View In Inventory Card */}
            <div
              className={`bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl ${
                showModal ? "bg-amber-500" : ""
              }`}
              onClick={openModal}
            >
              <FaList className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">View In Inventory</h3>
              </div>
            </div>

            {/* Low Stock Card */}
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

          {/* Inventory List Table */}
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
                  <th className="p-2 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="p-2 border-b text-center">{product.product}</td>
                    <td className="p-2 border-b text-center">{product.manufacture_date}</td>
                    <td className="p-2 border-b text-center">{product.expire_date}</td>
                    <td className="p-2 border-b text-center">{product.weight}</td>
                    <td className="p-2 border-b text-center">{product.items}</td>
                    <td className="p-2 border-b text-center">{product.description}</td>
                    <td className="p-2 border-b text-center flex justify-center space-x-2">
                      <button onClick={() => handleEditClick(product)}>
                        <FaEdit className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDeleteClick(product._id)}>
                        <FaTrash className="text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modals */}
          {showModal && (
            <Modal onClose={closeModal} title="Inventory List">
              <ul>
                {products.map((product) => (
                  <li key={product._id}>
                    {product.product} - {product.items} units
                  </li>
                ))}
              </ul>
              <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded">
                Close
              </button>
            </Modal>
          )}

          {showUpdateModal && (
            <UpdateProductModal
              product={selectedProduct}
              onUpdate={handleUpdate}
              onClose={() => setShowUpdateModal(false)}
            />
          )}

          {showLowStockModal && (
            <Modal onClose={closeLowStockModal} title="Low Stock Products">
              <ul>
                {lowStockProducts.map((product) => (
                  <li key={product._id}>
                    {product.product} - {product.items} units
                  </li>
                ))}
              </ul>
              <button onClick={closeLowStockModal} className="bg-red-500 text-white p-2 rounded">
                Close
              </button>
            </Modal>
          )}
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
