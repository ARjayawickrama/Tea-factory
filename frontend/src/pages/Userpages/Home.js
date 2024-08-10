import React, { useState, useEffect, useRef } from 'react';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import Footer from '../../components/footer/Footer';
import Product1 from '../../assets/type1.png';
import Product2 from '../../assets/type2.png';
import Product3 from '../../assets/type3.png';
import Tea_Grown from '../../assets/logo.png';
import Alert from '../../components/Alert/Alert';
import About from './Home_content';
import Contact from '../../components/Contacts/Contacts';
import imge1 from '../../assets/imge1.jpg';
import imge2 from '../../assets/imge2.jpg';
import imge3 from '../../assets/imge3.jpg';
import imge4 from '../../assets/imge4.jpg';

// Define images and slides arrays
const images = [imge1, imge2, imge3, imge4];
const slides = []; // Add your slide data here

const services = [
  { title: 'Production Management', icon: '🏭', color: 'bg-stone-900' },
  { title: 'Quality Control', icon: '🔍', color: 'bg-green-500' },
  { title: 'Packaging', icon: '📦', color: 'bg-stone-900' },
  { title: 'Supplier Services', icon: '🚚', color: 'bg-green-500' },
  { title: 'Sales', icon: '💼', color: 'bg-stone-900' },
  { title: 'Customer Service', icon: '📞', color: 'bg-green-500' },
];

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const formRef = useRef(null);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    const handleClickOutside = event => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="bg-white h-auto">
      
      
      {/* Slideshow */}
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow relative">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover brightness-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-sm tracking-widest uppercase">Importer and purveyor of fine tea since 1843</p>
                <h1 className="mt-4 text-4xl font-bold md:text-5xl">Quality tea production from Sri Lanka</h1>
                <a
                  href="#aboutSection"
                  className="mt-8 px-14 py-2 border border-green-500 text-green-500 inline-block hover:border-red-500 hover:text-red-500"
                >
                  About
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Slideshow End */}

      <About id="aboutSection" />
      <Alert />
      <NavbarComponent />

      <div id="areaSection">
        <div className="relative inset-0 flex flex-col items-center justify-center text-black">
          <div className="text-slider"></div>
        </div>
        <div className="relative inset-0 flex flex-col items-center justify-center text-black top-24"></div>
      </div>

      <div className="font-sans">
        <Contact isOpen={isOpen} closeForm={closeForm} />
      </div>

      {/* Products */}
      <h2 className="text-green-600 text-sm font-semibold uppercase relative top-3 text-center">From the Shop</h2>
      <h1 className="text-5xl font-extrabold mb-2 text-black text-center relative bottom-16">Choose Your Taste</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-7/12 mx-auto h-auto rounded-t-2xl border-white rounded-bl-full">
        {[
          { src: Product3, name: 'Rosemary Black', price: '$9.00' },
          { src: Product1, name: 'Indian Summer', price: '$9.00' },
          { src: Product2, name: 'Fruit Rhapsody', price: '$9.00' },
          { src: Product3, name: 'Chicory Roasted', price: '$9.00' },
        ].map((product, index) => (
          <div
            key={index}
            className="text-center relative group mb-4 sm:mb-0 flex flex-col items-center shadow-sm drop-shadow-lg w-full mx-auto h-auto max-w-xs rounded-full overflow-hidden"
          >
            <img
              src={product.src}
              alt={product.name}
              className="w-40 h-40 object-cover mx-auto transition-transform duration-300 transform group-hover:scale-105 rounded-full"
            />
            <div className="mt-2 text-center">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">Donec fermentum nunc nenunc rutrum.</p>
              <p className="text-green-500 font-semibold">{product.price}</p>
              <button className="mt-11 px-4 py-1 w-24 h-10 bg-green-600 text-white rounded relative bottom-5 text-xs">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Products End */}

      {/* Contact Button */}
      <button
        className="bg-green-600 text-white p-4 border-none cursor-pointer opacity-80 fixed bottom-6 right-7 w-72 hover:opacity-100"
        onClick={openForm}
      >
        Contact Now
      </button>
      {/* Contact Button End */}


      {/* Services */}
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-green-600 text-lg">What We Offer</h2>
        <h1 className="text-4xl mb-4 font-extrabold">Our Services</h1>
        <p className="mb-8 text-gray-600 font-serif">
          We offer a comprehensive range of services to ensure the smooth and efficient operation of your tea factory. From production management to customer service, we cover all aspects of tea factory management with expertise and dedication.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service.title}
              className={`${service.color} p-6 rounded-lg flex flex-col items-center hover:scale-105`}
            >
              <span className="text-5xl text-white">{service.icon}</span>
              <h3 className="text-xl font-semibold mt-4 text-white">{service.title}</h3>
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
