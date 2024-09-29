import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Main from '../../../assets/imge4.jpg';
import NavbarComponent from '../../../components/Navigation_bar/User/NavbarComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../components/footer/Footer';
import { useAuth  } from '../../../context/AuthContext'; 

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const { userId, token } = useAuth();
    

    
    
    const containerStyle = { 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${Main})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    };

    // Fetch products when component loads
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5004/DisplayProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                
            } 
        };
    
        fetchProducts();
    }, []);

    

    // Handle weight/price selection for each product
    const handleWeightChange = (productId, weight) => {
        const selectedProduct = products.find(product => product._id === productId);
        const selectedWeight = selectedProduct.weights.find(w => w.weight === weight);

        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [productId]: {
                weight: selectedWeight.weight,
                price: selectedWeight.price,
            },
        }));
    };

    // API call to add item to cart
   
    const handleAddToCart = async (product) => {
    const selected = selectedOptions[product._id];

    if (!userId) {
        toast.error('Please login before adding items to the cart.', {
            position: "top-right",
            autoClose: 3000,
        });
        return;
    }

    if (!selected) {
        toast.error('Please select a weight before adding to the cart.', {
            position: "top-right",
            autoClose: 3000,
        });
        
        return;
    }

    

    const cartItem = {
        userId: userId,
        items: [{
            productId: product._id,  // Include product ID as it's required by the schema
            productName: product.productName,
            quantity: 1,
            weight: selected.weight,
            price: selected.price,
        }]
        
    };


    
    
    if (!token) {
        toast.error('Authorization token is missing, please log in again.');
        return;
    }

    try {
        await axios.post('http://localhost:5004/cart/add', cartItem, {
            headers: {
                "Authorization": `Bearer ${token}`
                
            }
        });

            toast.success('Item added to cart successfully!');
        
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Token is not valid or expired.');
                toast.error('Session expired, please log in again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                console.error('Error adding to cart:', error.response.data);
                toast.error('Failed to add item to cart.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } else {
            console.error('Error adding to cart:', error.message);
            toast.error('Failed to add item to cart.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }
};


    

    


    return (
        <div>
            <NavbarComponent />
            <div style={containerStyle} className="p-4 text-center bg-black bg-opacity-50">
                <h1 className="text-3xl font-bold text-white">Our Products</h1>
            </div>

            {/* Shopping Cart Button */}
            <div className="flex justify-end p-4">
                <Link to="/cart">
                    <button className="px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600">
                        Go to Cart
                    </button>
                </Link>
            </div>

            <div className="relative bottom-64">
                <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-64 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center w-full max-w-xs mb-4 overflow-hidden text-center bg-white rounded-lg shadow-lg group"
                        >
                            <div className="relative">
                            <img
    src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`}
    alt={product.productName}
    className="object-cover w-full h-56 transition-transform duration-300 transform group-hover:scale-105"
    onError={(e) => {
        e.target.onerror = null; // prevents looping
        e.target.src = 'path/to/placeholder/image.jpg'; // Placeholder image
    }}
/>

                            </div>
                            <div className="p-4">
                                <h2 className="mb-2 text-xl font-bold">{product.productName}</h2>

                                {/* Weight Selection */}
                                <select
                                    onChange={(e) => handleWeightChange(product._id, e.target.value)}
                                    className="p-2 mb-2 border border-gray-300 rounded"
                                >
                                    <option value="">Select Weight</option>
                                    {product.weights.map((weight) => (
                                        <option key={weight.weight} value={weight.weight}>
                                            {weight.weight} - Rs.{weight.price}.00
                                        </option>
                                    ))}
                                </select>

                                {/* Navigate to ProductDetails page with product ID */}
                                <Link to={`/product/${product._id}`}>
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                                        View Details
                                    </button>
                                </Link>
                                <button
                                    className="px-4 py-2 mt-2 text-white bg-green-500 rounded-full hover:bg-green-600"
                                    onClick={() => handleAddToCart(product)}
                                    
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast notifications container */}
            <ToastContainer />
            <Footer />
        </div>
    );
}
