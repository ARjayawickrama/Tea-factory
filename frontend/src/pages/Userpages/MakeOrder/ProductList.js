import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from '../../../assets/imge4.jpg';
import NavbarComponent from '../../../components/Navigation_bar/User/NavbarComponent';

export default function ProductList() {
    const [products, setProducts] = useState([]);

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

    return (
        <div>
            <NavbarComponent />
            <div style={containerStyle} className="p-4 text-center bg-black bg-opacity-50">
                <h1 className="text-3xl font-bold text-white">Our Products</h1>
            </div>

            <div className="relative bottom-64">
                <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-64 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center w-full max-w-xs mb-4 overflow-hidden text-center bg-white rounded-lg shadow-lg group"
                        >
                            <div className="relative">
                                <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500">
                                    30% OFF
                                </span>
                                <img
                                    src={`http://localhost:5004/images/${product.productImage.split('/').pop()}`}
                                    alt={product.productName}
                                    className="object-cover w-full h-56 transition-transform duration-300 transform group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="mb-2 text-xl font-bold">{product.productName}</h2>
                                <p className="mb-2 text-gray-600">Rs.{product.price}.00</p>
                                <button className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full w-28 hover:bg-green-700">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
