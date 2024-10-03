import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBox, FaList,  } from 'react-icons/fa';
import generateOrderPDF from './OrderPDF';




export default function OrderManage() {
  const [isSidebarOpen] = useState(true);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch the orders from the backend
    useEffect(() => { 
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5004/Checkout/orders');
            const data = await response.json();
            setOrders(data.orders); // Assuming the response contains an array of orders
        } catch (error) {
            toast.error('Failed to fetch orders.');
        }  
    };

    // Handle order deletion
    const handleDelete = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5004/Checkout/delete-order/${orderId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Order deleted successfully!');
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                toast.error('Failed to delete order.');
            }
        } catch (error) {
            toast.error('An error occurred while deleting the order.');
        }
    };

    // Function to handle navigation to orderlist.js
    const handleViewOrderListClick = () => {
      navigate('/displayProductManage');
    };
    
    return (
      <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <nav>
          <ul>
            <li className="flex items-center p-4 cursor-pointer bg-amber-500 mt-9">
              <FaBox className="w-8 h-8 mr-4" />
              <span className="text-lg font-semibold">Order</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Orders Manage</h1>

        <div className="flex justify-between mb-4 dashboard-header">
          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item">
            <FaBox className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p>{orders.length}</p> 
            </div>
          </div>

          <div className="flex items-center p-4 space-x-2 bg-gray-200 rounded dashboard-item" onClick={handleViewOrderListClick}>
            <FaList className="w-6 h-6 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">View Product manage</h3>
            </div>
          </div>
        </div>
        {/* Button to Download PDF */}
        <div className="mb-4">
                <button 
                    className="px-4 py-2 text-white bg-green-600 rounded"
                    onClick={() => generateOrderPDF(orders)} // Make sure to call with orders
                >
                    Download PDF
                </button>
            </div>
      
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Order List</h1>
            <table className="w-full bg-white border-collapse rounded-lg shadow-md table-auto">
  <thead>
    <tr className="text-left text-gray-800 bg-green-500">
      <th className="w-1/4 p-2 text-xl text-center border border-gray-300">Name</th>
      <th className="w-1/4 p-2 text-xl text-center border border-gray-300">Contact</th>
      <th className="w-1/4 p-2 text-xl text-center border border-gray-300">Email</th>
      <th className="w-1/2 p-2 text-xl text-center border border-gray-300">
        Order Items
        <table className="w-full mt-2 bg-gray-100">
          <thead>
            <tr className="text-gray-700 bg-gray-300">
              <th className="w-1/2 p-2 text-center border border-gray-800">Product Name</th>
              <th className="w-1/4 p-2 text-center border border-gray-800 ">Weight</th>
              <th className="w-1/4 p-2 text-center border border-gray-800">Units</th>
            </tr>
          </thead>
        </table>
      </th>
      <th className="w-1/4 p-4 text-xl text-center border border-gray-300">Total Price</th>
      <th className="w-1/4 p-4 border border-b border-gray-300">Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <tr key={order._id} className="border hover:bg-green-300">
        <td className="p-4 border border-b border-gray-900">{order.name}</td>
        <td className="p-4 border border-b border-gray-900">{order.contact}</td>
        <td className="p-4 border border-b border-gray-900">{order.email}</td>
        <td className="p-4 border border-b border-gray-900">
          <table className="w-full mt-2 bg-gray-100">
            <tbody>
              {order.cartItems.map((item, index) => (
                <tr key={index} className="text-gray-700 bg-gray-300">
                  <td className="w-1/2 p-2 border border-b border-gray-300 ">{item.productName}</td>
                  <td className="w-1/4 p-2 border border-b border-gray-300">{item.weight}</td>
                  <td className="w-1/4 p-2 border border-b border-gray-300">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td className="p-4 border border-b border-gray-900">Rs.{order.totalPrice}.00</td>
        <td className="p-4 border-b border-gray-300">{order.status}</td>
      </tr>
    ))}
  </tbody>
</table>




            {/* Toast notifications container */}
            <ToastContainer />
        </div>
        </main>
        </div>
    );
}
