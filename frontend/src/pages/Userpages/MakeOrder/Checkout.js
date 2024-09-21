import React, { useContext, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

export default function Checkout() {
    const { cartItems } = useContext(CartContext); // Get cart items from context
    const navigate = useNavigate(); // For navigation after order confirmation

    // State to store order details
    const [orderDetails, setOrderDetails] = useState({
        name: '',
        contact: '',
    });

    // Calculate total price
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

    // Handle order confirmation
    const handleConfirmOrder = () => {
        if (!orderDetails.name || !orderDetails.contact) {
            toast.error('Please fill out all order details.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Here, you would normally send the order details to the server.
        // This is where you would also clear the cart or navigate to an order success page.
        
        toast.success('Order placed successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // After confirmation, navigate to a success page (or home page)
        navigate('/order-success'); 
    };

    if (cartItems.length === 0) {
        return <p>Your cart is empty. Go back and add some products.</p>;
    }

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Checkout</h1>

            {/* Display cart items */}
            <div className="mb-8">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-md">
                        <div>
                            <h2 className="text-xl">{item.productName}</h2>
                            <p>Price: Rs.{item.price}.00</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Price */}
            <div className="mb-4 text-lg font-bold">
                Total Price: Rs.{calculateTotalPrice()}.00
            </div>

            {/* Shipping details form */}
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
