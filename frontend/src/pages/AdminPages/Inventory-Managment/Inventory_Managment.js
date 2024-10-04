import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaEdit,
  FaTrash,
  FaBox,
  FaList,
  IoCaretBackSharp,
  FaDownload,
  FaExclamationTriangle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { IoCaretBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import UpdateProductModal from "./UpdateProductModal";
import { generatePDF } from "../Inventory-Managment/PDFReport"; // Correct import
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PieChartWithAnimation from "./PieChartWithAnimation";
import MyVideo1 from "../../../assets/Admin123.mp4";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
  const [showChartPopup, setShowChartPopup] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/InventoryProduct"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/InventoryProduct"
        );
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

  const handleNewStockClick = () => navigate("/Inventory_Form");
  const handleRawMaterialsClick = () => navigate("/Raw_Materials");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5004/InventoryProduct/${id}`);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
          toast.success("Product deleted successfully!");

          Swal.fire({
            title: "Deleted!",
            text: "The product has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product.");

          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error",
          });
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
      console.error("Updated product data is invalid");
    }
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter products for low stock (units less than 20)
  const lowStockProducts = products.filter((product) => product.items < 20);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  const handleDownloadReport = () => {
    generatePDF(products); // Call the generatePDF function with products
  };

  const closeLowStockModal = () => setShowLowStockModal(false);
  const openChartPopup = () => {
    const data = products.map((product) => ({
      product: product.product, // Correct property
      items: product.items, // Correct property
    }));

    setChartData(data);
    setShowChartPopup(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-stone-800 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="min-h-screen relative flex flex-col">
          <video
            src={MyVideo1}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
          />

          <nav className="relative z-10">
            <ul>
              <li>
                <Link
                  to="/adminhome"
                  className="p-4 cursor-pointer bg-amber-500 flex items-center"
                >
                  <IoCaretBack className="w-12 h-12 mr-4 justify-center relative ml-16" />
                
                </Link>
              </li>

              <li
                className={`p-4 cursor-pointer flex items-center ${
                  hoveredItem === "raw" ? "bg-neutral-800" : "bg-stone-800"
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
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Product Details
        </h1>

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
              className={`bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl ${
                showModal ? "bg-amber-500" : ""
              }`}
              onClick={openChartPopup}
            >
              <FaList className="w-8 h-8 text-gray-600" />
              <div>
                <h3 className="text-xl font-semibold">View In Inventory</h3>
              </div>
            </div>
            {showChartPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative">
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    onClick={() => setShowChartPopup(false)}
                  >
                    &times;
                  </button>
                  <PieChartWithAnimation chartData={chartData} />
                </div>
              </div>
            )}
            <div
              className="bg-red-200 p-6 rounded-lg shadow-lg flex items-center space-x-4 w-full md:w-1/3 transition-transform transform hover:-translate-y-2 hover:shadow-xl"
              onClick={() => setShowLowStockModal(true)} // Open low stock modal on click
            >
              <FaExclamationTriangle className="w-8 h-8 text-grey-500" />
              <div>
                <h3 className="text-xl font-semibold">Low Stock</h3>
                <span className="text-2xl font-bold">
                  {lowStockProducts.length}
                </span>
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

<div className="overflow-x-auto">
  <table className="min-w-full table-fixed border-collapse bg-white shadow-md">
    <thead>
      <tr className="bg-green-800 text-white font-extrabold">
        <th className="p-2 border-b text-center border w-1/4">Product</th>
        <th className="p-2 border-b text-center border w-1/4">Manufacture Date</th>
        <th className="p-2 border-b text-center border w-1/4">Expire Date</th>
        <th className="p-2 border-b text-center border w-1/4">Weight</th>
        <th className="p-2 border-b text-center border w-1/4">Units</th>
        <th className="p-2 border-b text-center border w-1/4">Description</th>
        <th className="p-2 border-b text-center border w-1/4">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredProducts.map((product) => (
        <tr key={product._id}>
          <td className="p-2 border-b text-center border">{product.product}</td>
          <td className="p-2 border-b text-center border">{product.manufactureDate}</td>
          <td className="p-2 border-b text-center border">{product.expireDate}</td>
          <td className="p-2 border-b text-center border">{product.weight}</td>
          <td className="p-2 border-b text-center border">{product.items}</td>
          <td className="p-2 border-b text-center border">{product.description}</td>
          <td className="p-2 border-b text-center">
            <button
              className="text-blue-600 hover:text-blue-800 mr-2"
              onClick={() => handleEditClick(product)}
            >
              <FaEdit />
            </button>
            <button
              className="text-red-600 hover:text-red-800"
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
        </div>

        {/* Low Stock Modal */}
        {showLowStockModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-2/3">
              <h2 className="text-2xl font-bold mb-4">Low Stock Products</h2>
              <button
                className="text-red-600 absolute top-2 right-2"
                onClick={closeLowStockModal}
              >
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
                      <td className="p-2 border-b text-center">
                        {product.product}
                      </td>
                      <td className="p-2 border-b text-center">
                        {product.items}
                      </td>
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
