import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/Navigation_bar/User/NavbarComponent";
import Footer from "../../components/footer/Footer";
import Product1 from "../../assets/type1.png";
import Product2 from "../../assets/type2.png";
import Product3 from "../../assets/type3.png";
import Alert from "../../components/Alert/Alert";
import About from "./Home_content";
import imge1 from "../../assets/imge1.jpg";
import imge2 from "../../assets/imge2.jpg";
import imge3 from "../../assets/imge3.jpg";
import imge4 from "../../assets/imge4.jpg";
import myVideo from '../../assets/Chai.mp4';
import myVideo2 from '../../assets/drivana.mp4';

const images = [imge1, imge2, imge3, imge4];
const videos = [myVideo, myVideo2];
const slideDuration = 5000;
const videoDuration = 15000;

const services = [
  { title: "Production Management", icon: "🏭", color: "bg-stone-900" },
  { title: "Quality Control", icon: "🔍", color: "bg-green-500" },
  { title: "Packaging", icon: "📦", color: "bg-stone-900" },
  { title: "Supplier Services", icon: "🚚", color: "bg-green-500" },
  { title: "Sales", icon: "💼", color: "bg-stone-900" },
  { title: "Customer Service", icon: "📞", color: "bg-green-500" },
];

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === (images.length + videos.length - 1) ? 0 : prevIndex + 1
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + videos.length));
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);


  const NavigateFeed = () => {
    
    navigate('/FeedbackMainPage'); 
  };
  return (
    <div className="bg-white">
      {/* Slideshow */}
      <div className="min-h-screen relative flex flex-col">
        {videos.concat(images).map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            {index < videos.length ? (
              <video src={item} className="w-full h-full object-cover brightness-50" autoPlay loop muted />
            ) : (
              <img src={item} alt={`Slide ${index}`} className="w-full h-full object-cover brightness-50" />
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
        <h1 className="text-5xl font-extrabold mb-2 text-green-900 text-center mt-60">Shop Our Teas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-10/12 mx-auto mt-8">
          {[
            { src: Product1, name: "Chamomile Botanical Blend Sachets", price: "$4.00–$28.00", discount: "30% OFF" },
            { src: Product2, name: "Organic Dandelion & Peach Naturally", price: "$3.00–$21.00", discount: "30% OFF" },
            { src: Product3, name: "Chamomile Blend Organic Tea", price: "$5.00–$35.00", discount: "30% OFF" },
            { src: Product1, name: "Chamomile Botanical Blend Sachets", price: "$4.00–$28.00", discount: "30% OFF" },
          ].map((product, index) => (
            <div key={index} className="text-center group mb-4 flex flex-col items-center shadow-lg w-full max-w-xs bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">{product.discount}</span>
                <img src={product.src} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <button className="mt-4 px-4 py-2 w-28 bg-green-600 text-white rounded-full hover:bg-green-700"   onClick={NavigateFeed}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Products End */}

      {/* Services */}
      <div className="mx-auto bg-gradient-to-r relative bottom-56">
        <div className="text-center mb-12 bg-lime-700 py-8">
          <h2 className="text-green-300 text-lg font-bold uppercase tracking-wide">What We Offer</h2>
          <h1 className="text-4xl font-extrabold text-white mt-2 mb-4">Our Services</h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            We offer a comprehensive range of services to ensure the smooth and efficient operation of your tea factory...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className={`text-center p-8 rounded-lg shadow-md ${service.color}`}>
              <span className="text-6xl">{service.icon}</span>
              <h2 className="text-2xl font-bold text-white mt-4">{service.title}</h2>
            </div>
          ))}
        </div>
      </div>
      {/* Services End */}

      <Footer />
    </div>
  );
}

export default Home;
