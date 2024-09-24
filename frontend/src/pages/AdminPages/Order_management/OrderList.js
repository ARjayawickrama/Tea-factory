import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrderList() {
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

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Order List</h1>
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.name}</td>
                            <td>{order.contact}</td>
                            <td>{order.email}</td>
                            <td>Rs.{order.totalPrice}.00</td>
                            <td>
                                <button 
                                    className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                    onClick={() => navigate(`/update-order/${order._id}`)} // Use navigate here
                                >
                                    Update
                                </button>
                                <button 
                                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                                    onClick={() => handleDelete(order._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Toast notifications container */}
            <ToastContainer />
        </div>
    );
}
