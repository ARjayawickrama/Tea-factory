import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const userId = 'userId';
    const navigate = useNavigate(); // Hook for navigation
    


    const updateQuantity = async (productId, selectedWeight, quantity) => {
        try {
            const response = await axios.post('http://localhost:5004/cart/update-quantity', {
                userId,
                productId,
                selectedWeight,
                quantity,
            });
            // Update the cartItems state with the updated cart data
            setCartItems(response.data.items);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    
    const handleQuantityChange = (itemId, selectedWeight, quantity) => {
        if (quantity < 1) return; // Prevent setting quantity below 1
        updateQuantity(itemId, selectedWeight, quantity); // Call updateQuantity with the necessary parameters
    };
    

    // Handle checkout navigation 
    const handleCheckout = () => {
        navigate('/checkout'); // Navigate to checkout page
    };
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/cart/${userId}`);
                setCartItems(response.data.items);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [userId]);

    const removeFromCart = async (productId, selectedWeight) => {
        try {
            await axios.post('http://localhost:5004/cart/remove', {
                userId,
                productId,
                selectedWeight,
            });
            // Remove the item from the state
            setCartItems(cartItems.filter(item => !(item.productId === productId && item.selectedWeight === selectedWeight)));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };
    

    

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={`${item._id}-${item.selectedWeight}`} className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-md">
                            <div>
                                <h2 className="text-xl">{item.productName}</h2>
                                <p>Unit Price: Rs.{item.price}.00</p>
                                <p>Weight: {item.weight}</p> {/* Display selected weight */}
                                
                                {/* Quantity input field */}
                                <div>
                                    <label htmlFor={`quantity-${item._id}`} className="block mb-1">Quantity:</label>
                                    <input
                                        id={`quantity-${item._id}-${item.selectedWeight}`}
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item._id, item.selectedWeight, Number(e.target.value))} // Pass selectedWeight
                                        className="w-16 px-2 border rounded"
                                    />
                                </div>
                            </div>

                            {/* Buttons for viewing product details and removing item from cart */}
                            <div className="flex space-x-2">
                                <button
                                    className="px-4 py-2 text-white bg-blue-600 rounded-full"
                                    onClick={() => navigate(`/product/${item._id}`)} // Navigate to product details
                                >
                                    View Details
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-red-600 rounded-full"
                                    onClick={() => removeFromCart(item._id, item.selectedWeight)} // Remove item from cart with selected weight
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Checkout Button */}
            {cartItems.length > 0 && (
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 text-white bg-green-600 rounded-full hover:bg-green-700"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}