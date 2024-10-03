//ShoppingCart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuth();  


    
    const updateQuantity = async (productId, weight, quantity) => {
        if (quantity < 1) return; // Early exit if quantity is invalid
    
        try {
            const response = await axios.put('http://localhost:5004/cart/update-quantity', {
                productId,
                weight, 
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token for authorization
                }
            });
            
            setCartItems(response.data.items); // Update state with the new cart items
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Optionally show an error message to the user
        }
    };
    

    const handleQuantityChange = (productId, weight, quantity) => {
        updateQuantity(productId, weight, quantity);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

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
                
            } 
        };
    
        // Fetch cart only if token is available
        if (token) {
            fetchCart();
        }
    }, [token]); 
    

    

    const removeFromCart = async (productId, weight) => {
        if (!token) {
            toast.error('Authorization token is missing, please log in again.');
            return;
        }
    
        try {
              await axios.delete('http://localhost:5004/cart/remove', {
                headers: {
                    "Authorization": `Bearer ${token}`,  // Include the token in the headers
                    "Content-Type": "application/json"    // Specify content type
                },
                data: { productId, weight }  // Include productId and weight in the request body
            });
            
            // Update the cart items in the state
            setCartItems(cartItems.filter(item => !(item.productId === productId && item.weight === weight)));
    
            toast.success('Item removed from cart successfully.');
        } catch (error) {
            console.error('Error removing item:', error);
            // Optionally show an error message to the user
            toast.error('Failed to remove item from cart.');
        }
    };
    
    

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(({ productId, productName, price, weight, quantity }) => (
                        <li key={`${productId}-${weight}`} className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-md">
                            <div>
                                <h2 className="text-xl">{productName}</h2>
                                <p>Unit Price: Rs.{price}.00</p>
                                <p>Weight: {weight}</p>
                                <div>
                                    <label htmlFor={`quantity-${productId}-${weight}`} className="block mb-1">Quantity:</label>
                                    <input
                                        id={`quantity-${productId}-${weight}`}
                                        type="number"
                                        value={quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(productId, weight, Number(e.target.value))}
                                        className="w-16 px-2 border rounded"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-4 py-2 text-white bg-blue-600 rounded-full"
                                    onClick={() => navigate(`/product/${productId}`)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-red-600 rounded-full"
                                    onClick={() => removeFromCart(productId, weight)}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
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

              <ToastContainer />
              
        </div>
    );
}
