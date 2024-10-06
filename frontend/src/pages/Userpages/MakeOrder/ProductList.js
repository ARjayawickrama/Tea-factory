import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/Navigation_bar/User/NavbarComponent";
import Footer from "../../../components/footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import imge1 from "../../../assets/imge1.jpg"; // Import images correctly
import imge2 from "../../../assets/imge2.jpg";
import myVideo from "../../../assets/main4.mp4"; // Import videos
import myVideo2 from "../../../assets/main4.mp4";
import Main from "../../../assets/imge4.jpg";

const images = [imge1, imge2];
const videos = [myVideo, myVideo2];
const slideDuration = 5000;
const videoDuration = 15000;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0); // For slideshow
  const { userId, token } = useAuth();
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5004/DisplayProduct"
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Slideshow effect
  useEffect(() => {
    const duration =
      currentIndex < videos.length ? videoDuration : slideDuration;

    const timer = setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (images.length + videos.length)
      );
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  // Handle weight selection
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

  // Handle add to cart
  const handleAddToCart = async (product) => {
    const selected = selectedOptions[product._id];

    if (!userId) {
      toast.error("Please login before adding items to the cart.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!selected) {
      toast.error("Please select a weight before adding to the cart.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const cartItem = {
      userId: userId,
      items: [
        {
          productId: product._id,
          productName: product.productName,
          quantity: 1,
          weight: selected.weight,
          price: selected.price,
        },
      ],
    };

    try {
      await axios.post("http://localhost:5004/cart/add", cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleNavigate = () => {
    navigate("/FeedbackMainPage");
  };

  return (
    <div>
      <div className="min-h-screen relative flex flex-col">
        {videos.concat(images).map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {index < videos.length ? (
              <video
                src={item}
                className="w-full h-full object-cover brightness-50"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={item}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover brightness-50"
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-3xl tracking-widest uppercase ">Our Products</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Quality tea production from Sri Lanka
          </h1>
        </div>
      </div>

      {/* Search and Cart Button */}
      <div className="flex justify-between p-4 ml-28">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="p-2 mb-4 text-black bg-gray-300 border border-gray-700 rounded shadow-sm w-96"
        />
        <Link to="/cart">
          <button className="px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600  relative right-24">
            Go to Cart
          </button>
        </Link>
      </div>

      <div className="relative bottom-64">
        <div className="grid w-10/12 grid-cols-1 gap-8 mx-auto mt-64 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center w-full max-w-xs mb-4 overflow-hidden text-center bg-white rounded-lg shadow-lg group"
            >
              <div className="relative">
                <img
                  src={`http://localhost:5004/images/${product.productImage
                    .split("/")
                    .pop()}`}
                  alt={product.productName}
                  className="object-cover w-full h-56 transition-transform duration-300 transform group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/placeholder/image.jpg";
                  }}
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

                {/* View and Add to Cart */}
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
                <button
                  className="px-4 py-2 mt-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                  onClick={handleNavigate}
                >
                  Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavbarComponent />

      <Footer />
      <ToastContainer />
    </div>
  );
}
