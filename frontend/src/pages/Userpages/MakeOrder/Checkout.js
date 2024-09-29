import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState({
        name: '',
        contact: '',    
        email: '',
    });

    const [errors, setErrors] = useState({}); // State to store validation errors

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:5004/cart/customer-cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Handle change in shipping details form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Validate the form data
    const validateForm = () => {
        let formErrors = {};

        // Validate Name
        if (!orderDetails.name || orderDetails.name.length < 3) {
            formErrors.name = 'Name must be at least 3 characters long.';
        }

        // Validate Contact (Simple phone validation - digits only)
        const contactRegex = /^[0-9]{10,15}$/;
        if (!orderDetails.contact || !contactRegex.test(orderDetails.contact)) {
            formErrors.contact = 'Contact must be a valid phone number (10-15 digits).';
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!orderDetails.email || !emailRegex.test(orderDetails.email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Returns true if no errors
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
            const response = await axios.post('http://localhost:5004/Checkout/confirm-order', {
                ...orderDetails,
                cartItems,
            });

            if (response.status === 200) {
                toast.success('Order placed successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    onClose: () => {
                        navigate('/Product');
                    }
                });
            } else {
                toast.error(response.data.message || 'Order failed. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
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

            <div className="mb-8">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-md">
                        <div>
                            <h2 className="text-xl">{item.productName}</h2>
                            <p>Unit Price: Rs.{item.price}.00</p>
                            <p>Weight: {item.weight}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

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
