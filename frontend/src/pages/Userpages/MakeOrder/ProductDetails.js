import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
    const { id } = useParams();  // Get product ID from the URL
    const [product, setProduct] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const navigate = useNavigate();
    const { cartItems, addToCart } = useContext(CartContext); // Access cartItems for checking existing items

    // Fetch product details using the ID from the URL
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/DisplayProduct/${id}`);
                setProduct(response.data);
                // Set initial weight and price
                if (response.data.weights && response.data.weights.length > 0) {
                    setSelectedWeight(response.data.weights[0].weight);
                    setSelectedPrice(response.data.weights[0].price);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleWeightChange = (e) => {
        const selected = product.weights.find(weight => weight.weight === e.target.value);
        setSelectedWeight(selected.weight);
        setSelectedPrice(selected.price);
    };

    const handleAddToCart = () => {
        const isAlreadyInCart = cartItems.some(item => item._id === product._id);

        if (isAlreadyInCart) {
            toast.warn('This item is already in your cart.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            addToCart({ ...product, price: selectedPrice });
            toast.success('Item added to cart successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">{product.productName}</h1>
            <img
                src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`}
                alt={product.productName}
                className="w-full max-w-lg mb-4"
            />
            <p className="mb-2 text-gray-600">Price: Rs.{selectedPrice}.00</p>
            <p className="mb-2">{product.description}</p>
            
            {/* Weight Selection Dropdown */}
            <select
                value={selectedWeight}
                onChange={handleWeightChange}
                className="p-2 mb-4 border border-gray-300 rounded"
            >
                {product.weights.map((weight) => (
                    <option key={weight.weight} value={weight.weight}>
                        {weight.weight} - Rs.{weight.price}.00
                    </option>
                ))}
            </select>
            <div></div>

            <button
                className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-full w-28 hover:bg-blue-700"
                onClick={() => navigate('/checkout')}
            >
                Go to Checkout
            </button>
            <button
                className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full w-28 hover:bg-green-700"
                onClick={handleAddToCart} // Use the handleAddToCart function
            >
                Add to Cart
            </button>

            {/* Toast notifications container */}
            <ToastContainer />
        </div>
    );
}
