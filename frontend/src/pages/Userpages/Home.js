import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "../../components/Navigation_bar/User/NavbarComponent";
import Footer from "../../components/footer/Footer";
import Product1 from "../../assets/type1.png";
import Product2 from "../../assets/type2.png";
import Product3 from "../../assets/type3.png"; // Ensure this is imported correctly
import Alert from "../../components/Alert/Alert";
import About from "./Home_content";
import Equipment from "./EquipmentPages/Equipment";
import Contact from "../../components/Contacts/Contacts";
import imge1 from "../../assets/imge1.jpg";
import imge2 from "../../assets/imge2.jpg";
import imge3 from "../../assets/imge3.jpg";
import imge4 from "../../assets/imge4.jpg";
import myVideo from "../../assets/Chai.mp4";
import myVideo2 from "../../assets/drivana.mp4";
import { useNavigate } from 'react-router-dom';
const images = [imge1, imge2];
const videos = [myVideo, myVideo2];
const slideDuration = 5000;
const videoDuration = 15000;

const services = [
  { title: "Production Management", icon: "🏭", color: "bg-stone-900" },
  { title: "Quality Control", icon: "🔍", color: "bg-green-500" },
  { title: "Packaging", icon: "📦", color: "bg-green-500" },
  { title: "Supplier Services", icon: "🚚", color: "bg-green-500" },
  { title: "Sales", icon: "💼", color: "bg-green-500" },
  { title: "Customer Service", icon: "📞", color: "bg-green-500" },
];

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const formRef = useRef(null);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length + videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const navigate = useNavigate();
  const handleAddToCartClick = () => {
    navigate('/Product'); // Adjust the path according to your routing
  };
  return (
    <div className="bg-white">
      {/* Slideshow */}
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
          <p className="text-sm tracking-widest uppercase">
            Importer and purveyor of fine tea since 1843
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Quality tea production from Sri Lanka
          </h1>
          <a
            href="#aboutSection"
            className="mt-8 px-14 py-2 border border-green-500 text-green-500 inline-block hover:border-red-500 hover:text-red-500"
          >
            About
          </a>
        </div>
      </div>
      {/* Slideshow End */}

      <About id="aboutSection" />
      <Alert />
      <NavbarComponent />

      {/* Products */}
      <div className="relative bottom-64">
        <h1 className="text-5xl font-extrabold mb-2 text-green-900 text-center mt-60">
          Shop Our Teas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-10/12 mx-auto mt-8">
          {[
            {
              src: Product1,
              name: "Chamomile Botanical Blend Sachets",
              price: "400.00 LKR –500.00 LKR",
              discount: "30% OFF",
            },
            {
              src: Product2,
              name: "Organic Dandelion & Peach Naturally",
              price: "400.00 LKR –500.00 LKR",
              discount: "30% OFF",
            },
            {
              src: Product3,
              name: "Chamomile Blend Organic Tea",
              price: "800.00 LKR –1000.00 LKR",
              discount: "40% OFF",
            },
            {
              src: Product1,
              name: "Chamomile Botanical Blend Sachets",
              price: "300.00 LKR –200.00 LKR",
              discount: "20% OFF",
            },
            // Repeat as needed...
          ].map((product, index) => (
            <div
              key={index}
              className="text-center group mb-4 flex flex-col items-center shadow-lg w-full max-w-xs bg-white rounded-lg overflow-hidden"
            >
              <div className="relative">
                <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                  {product.discount}
                </span>
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <button
                  className="mt-4 px-4 py-2 w-28 bg-green-600 text-white rounded-full hover:bg-green-700"
                  onClick={handleAddToCartClick}
                >
                 View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Products End */}

      {/* Services */}
      <div className="mx-auto bg-gradient-to-r relative bottom-56">
        <div className="text-center mb-12 bg-lime-700 py-8">
          <h2 className="text-green-300 text-lg font-bold uppercase tracking-wide">
            What We Offer
          </h2>
          <h1 className="text-4xl font-extrabold text-white mt-2 mb-4">
            Our Services
          </h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            We offer a comprehensive range of services to ensure the smooth and
            efficient operation of your tea factory...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className={`p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
              style={{
                background: `linear-gradient(145deg, #ffffff, #f0f0f0)`,
                boxShadow: `6px 6px 12px #e0e0e0, -6px -6px 12px #ffffff`,
              }}
            >
              <div className={`rounded-full p-4 mb-6 ${service.color}`}>
                <span className="text-5xl text-white">{service.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Services End */}

      <Equipment id="equipment" />

      {/* Contact Button */}
      <button
        className="bg-green-600 text-white p-4 border-none cursor-pointer opacity-80 fixed bottom-6 right-7 w-72 hover:opacity-100"
        onClick={openForm}
      >
        Contact Now
      </button>
      {/* Contact Form */}
      <Contact isOpen={isOpen} closeForm={closeForm} />

      <Footer />
    </div>
  );
}

export default Home;
