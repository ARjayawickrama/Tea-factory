import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { token, userId } = useAuth();

    const [orderDetails, setOrderDetails] = useState({
        name: '',
        contact: '',
        email: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCart = async () => {
            if (!token) {
                toast.error('Authorization token is missing, please log in again.');
                return;
            }
            
            try {
                
                const response = await axios.get('http://localhost:5004/cart/', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
                // Optionally show an error message to the user
                toast.error('Failed to fetch cart items.');
            } 
        };
    
        // Fetch cart only if token is available
        if (token) {
            fetchCart();
        }
    }, [token]); 

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let formErrors = {};

        if (!orderDetails.name || orderDetails.name.length < 3) {
            formErrors.name = 'Name must be at least 3 characters long.';
        }

        const contactRegex = /^[0-9]{10,15}$/;
        if (!orderDetails.contact || !contactRegex.test(orderDetails.contact)) {
            formErrors.contact = 'Contact must be a valid phone number (10-15 digits).';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!orderDetails.email || !emailRegex.test(orderDetails.email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleConfirmOrder = async () => {
        if (!orderDetails.name || !orderDetails.contact || !orderDetails.email) {
            toast.error('Please fill out all order details.', {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        if (!validateForm()) {
            toast.error('Please correct the form errors before proceeding.', {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }

        try {
            await axios.post('http://localhost:5004/Checkout/confirm-order', {
                ...orderDetails,
                cartItems,
                userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token for authorization
                }
            });

            toast.success('Order placed successfully!', {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                    navigate('/Product');
                }
            });

            
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('An error occurred while placing the order.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    if (cartItems.length === 0) {
        return <p>Your cart is empty. Go back and add some products.</p>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Checkout</h1>

            {/* Cart items display */}
            <div className="mb-8 space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg shadow-md">
                        <div className="flex items-center">
                            {item.image && (
                                <img src={item.image} alt={item.productName} className="object-cover w-24 h-24 mr-4" />
                            )}
                            <div>
                                <h2 className="text-xl font-semibold">{item.productName}</h2>
                                <p className="text-gray-600">Unit Price: Rs.{item.price}.00</p>
                                <p className="text-gray-600">Weight: {item.weight}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Subtotal: Rs.{item.price * item.quantity}.00</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total price */}
            <div className="mb-4 text-lg font-bold">
                Total Price: Rs.{calculateTotalPrice()}.00
            </div>

            {/* Order details form */}
            <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Order Details</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={orderDetails.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your name"
                            required
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="contact" className="block">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={orderDetails.contact}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your contact number"
                            required
                        />
                        {errors.contact && <p className="text-red-500">{errors.contact}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={orderDetails.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your email address"
                            required
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                </form>
            </div>

            {/* Confirm order button */}
            <button
                className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
                onClick={handleConfirmOrder}
            >
                Confirm Order
            </button>

            {/* Toast notifications container */}
            <ToastContainer />
        </div>
    );
}
