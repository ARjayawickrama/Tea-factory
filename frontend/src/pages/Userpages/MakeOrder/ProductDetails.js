import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails() {
    const { id } = useParams();  // Get product ID from the URL
    const [product, setProduct] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [quantity, setQuantity] = useState(1); // State for quantity
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
            addToCart({ 
                ...product, 
                price: selectedPrice, 
                weight: selectedWeight,
                quantity
            });
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

    // Navigate to checkout with the selected product details
    const handleGoToCheckout = () => {
        const selectedProduct = {
            productName: product.productName,
            price: selectedPrice,
            weight: selectedWeight,
            quantity: quantity,
        };

        navigate('/checkout', { state: { selectedProduct } });
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container p-4 mx-auto">
            {/* Shopping Cart Button */}
            <div className="flex justify-end p-4">
                <Link to="/cart">
                    <button className="px-6 py-2 text-white transition duration-300 ease-in-out bg-yellow-500 rounded-full hover:bg-yellow-600">
                        Go to Cart
                    </button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img
                        src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`}
                        alt={product.productName}
                        className="object-cover w-full max-w-lg rounded-lg shadow-md"
                    />
                </div>
                
                {/* Product Details */}
                <div className="p-6 bg-white rounded-lg shadow-lg">
    <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">{product.productName}</h1>
        <p className="mb-4 text-lg text-gray-600">{product.description}</p>

        {/* Unit Price */}
        <div className="mb-4">
            <p className="font-bold text-gray-700">
                Unit Price: <span className="font-medium">Rs.{selectedPrice}.00</span>
            </p>
        </div>

        {/* Weight Input Field */}
        <div className="flex items-center mb-4 space-x-4">
            <label htmlFor="weight" className="font-bold text-gray-700">Weight:</label>
            <select
                id="weight"
                value={selectedWeight}
                onChange={handleWeightChange}
                className="w-24 p-2 border border-gray-300 rounded"
            >
                {product.weights.map((weight) => (
                    <option key={weight.weight} value={weight.weight}>
                        {weight.weight}
                    </option>
                ))}
            </select>
        </div>

        {/* Quantity Input Field */}
        <div className="flex items-center mb-4 space-x-4">
            <label htmlFor="quantity" className="font-bold text-gray-700">Quantity:</label>
            <input
                id="quantity"
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
            />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
            {/* Go to Checkout Button */}
            <button
                className="px-6 py-2 text-white transition duration-300 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={handleGoToCheckout}
            >
                Checkout
            </button>

            {/* Add to Cart Button */}
            <button
                className="px-6 py-2 text-white transition duration-300 ease-in-out bg-green-600 rounded-full hover:bg-green-700"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    </div>
</div>




            </div>
    
            {/* Toast notifications container */}
            <ToastContainer />
        </div>
    );
    
}