import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import Main from "../../../assets/imge4.jpg";
import NavbarComponent from "../../../components/Navigation_bar/User/NavbarComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import anju from "../../../assets/Admin123.mp4";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);

  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${Main})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  };

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/DisplayProduct"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle weight/price selection for each product
  const handleWeightChange = (productId, weight) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    const selectedWeight = selectedProduct.weights.find(
      (w) => w.weight === weight
    );

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [productId]: {
        weight: selectedWeight.weight,
        price: selectedWeight.price,
      },
    }));
  };

  const handleAddToCart = (product) => {
    const selected = selectedOptions[product._id];

    if (!selected) {
      toast.error("Please select a weight before adding to the cart.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const isAlreadyInCart = cartItems.some(
      (item) => item._id === product._id && item.weight === selected.weight
    );

    if (isAlreadyInCart) {
      toast.warn(
        "This item with the selected weight is already in your cart.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      addToCart({
        ...product,
        price: selected.price,
        weight: selected.weight,
        quantity: 1,
      });
      toast.success("Item added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleNavigate = () => {
    navigate("/FeedbackMainPage");
  };
  return (
    <div>
      
      <NavbarComponent />
      <div
        style={containerStyle}
        className="p-4 text-center bg-black bg-opacity-50"
      >
        <h1 className="text-4xl font-bold text-white">Our Products</h1>
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
                <span className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500">
                  30% OFF
                </span>
                <img
                  src={`http://localhost:5004/images/${product.productImage
                    .split("/")
                    .pop()}`}
                  alt={product.productName}
                  className="object-cover w-full h-56 transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              
              <div className="p-4">
                <h2 className="mb-2 text-xl font-bold">
                  {product.productName}
                </h2>
               
                {/* Weight Selection */}
                <select
                  onChange={(e) =>
                    handleWeightChange(product._id, e.target.value)
                  }
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
                  Add to Cartscsc
                </button>
                <button
                  className="px-4 py-2 mt-4 text-white bg-green-600 rounded-full w-28 hover:bg-green-700"
                  onClick={handleNavigate} // Use the handleAddToCart function
                >
                  FeedBack
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}
