import React, { useState, useEffect, useRef } from 'react';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import imge1 from '../../assets/new1.jpg';
import imge2 from '../../assets/imge2.jpg';
import imge3 from '../../assets/imge3.jpg';
import imge4 from '../../assets/new2.jpg';
import Footer from '../../components/footer/Footer';
import Product1 from '../../assets/logo.png';
import Product2 from '../../assets/logo.png';
import Product3 from '../../assets/logo.png';
import Tea_Grown from '../../assets/logo.png';
import Alert from '../../components/Alert/Alert';
import About from './Home_content';
import teaImage from '../../assets/map.png';
import Contact from '../../components/Contacts/Contacts';

import 'react-slideshow-image/dist/styles.css';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
const services = [
  { title: 'Production Management', icon: '🏭', color: 'bg-orange-900' },
  { title: 'Quality Control', icon: '🔍', color: 'bg-green-500' },
  { title: 'Packaging', icon: '📦', color: 'bg-orange-900' },
  { title: 'supplier services', icon: '🚚', color: 'bg-green-500' },
  { title: 'Sales', icon: '💼', color: 'bg-orange-900' },
  { title: 'Customer Service', icon: '📞', color: 'bg-green-500' },
];


const COLORS = ['#047A5B', '#0FFF13', '#9EDF9F', '#6BB96C', '#4AB500'];
const images = [imge1, imge2, imge3, imge4];
<<<<<<< Updated upstream
const slides = ["Sri Lanka's rich tea regions"];
=======
const slides = [ "Nuwara Eliya", "Rathnapura", "Deniyaya", "Akurassa", "Bandarawela"];
>>>>>>> Stashed changes
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 180},
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 250 }
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
      {/* slideshow */}
      <div className="min-h-screen flex flex-col ">
        <div className="flex-grow relative">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
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
      {/* slideshow  End*/}
      
      <About id="aboutSection" />
      <Alert />
      <NavbarComponent />

      <div id='areaSection'>
        <div>
          <div className="relative inset-0 flex flex-col items-center justify-center text-black">
            <div className="text-slider"></div>
          </div>
          <div className="relative inset-0 flex flex-col items-center justify-center text-black top-24"></div>
        </div>

        <div className="font-sans">
          <Contact isOpen={isOpen} closeForm={closeForm} />
        </div>
      </div>

  
<<<<<<< Updated upstream
       {/* 3 part  */}
       <h2 className="text-4xl font-bold  text-center mb-32 ">Sri Lanka's rich <span className="text-green-600">tea regions</span></h2>
      <div className="  flex  lg:flex-row items-center  w-7/12 mx-auto h-auto   relative bottom-36 ax-w-4xl ">
      
=======

      <div className="  flex flex-col lg:flex-row items-center w-9/12 mx-auto h-auto relative bottom-36">
>>>>>>> Stashed changes
        <div className="lg:w-1/2 flex justify-center">
        
          <img src={teaImage} alt="Tea Bag" className="w-full h-auto max-w-xs lg:max-w-md ml-32 mt-7 mb-7" />
        </div>
        <PieChart width={500} height={500} className='hover:scale-110'>
          <Pie
            data={data}
            cx={250}
            cy={200}
            label
            labelLine={false}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        
        <div className="lg:w-1/2 p-8 ">
<<<<<<< Updated upstream
         
=======
       
          <h2 className="text-4xl font-bold mb-4">Sri Lanka's rich <span className="text-green-600">tea regions</span></h2>
>>>>>>> Stashed changes
          <p className="text-gray-700 mb-8">Experience the essence of Sri Lanka with our premium teas. Each sip brings you closer to the lush, vibrant tea regions of the island.</p>
          <ul className="space-y-2">
            {[
              "100% Natural",
              "Free Delivery",
              "Highest Quality",
              "Healthy Leaves",
              "Online Store & Payments",
              "Eco Package",
              "Improves Brain Function",
              "Without GMO"
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-600">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 4.293a1 1 0 010 1.414L9 13.414l-3.707-3.707a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l8.5-8.5a1 1 0 00-1.414-1.414z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <button className="mt-8 px-4 py-2 bg-green-600 text-white rounded">Read More</button>
        </div>
        
      </div>
<<<<<<< Updated upstream

       {/* 3 part end */}

        {/* 4 part  */}
        <h2 className="text-green-600 text-sm font-semibold uppercase relative top-3 text-center">
        From the Shop
        </h2>
<h1 className="text-5xl font-bold mb-2 text-amber-800 text-center relative bottom-16">
  Choose Your Taste
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-7/12 mx-auto h-auto rounded-t-2xl border-white rounded-bl-full">
=======
      <h2 className="text-green-600 text-sm font-semibold uppercase relative top-3 text-center ">
      from the shop
              </h2>
      <h1 className="text-5xl font-bold mb-2 text-amber-800 text-center  relative bottom-16 ">Choose Your Taste </h1>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-8/12 mx-auto h-auto rounded-t-2xl border-white rounded-bl-full">
>>>>>>> Stashed changes
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
        <button className="mt-11 px-4 py-1 w-24 h-10 bg-green-600 text-white rounded relative bottom-5  text-xs">Add to Cart</button>
      </div>
    </div>
  ))}
</div>

        {/* 4 part end */}

        {/* Contact button*/}
      <button
        className="bg-green-600 text-white p-4 border-none cursor-pointer opacity-80 fixed bottom-6 right-7 w-72 hover:opacity-100"
        onClick={openForm}
      >
        Contact Now
      </button>
<<<<<<< Updated upstream
{/* Contact button end*/}
=======


      <div className="bg-[#F9F5F0] p-8 w-8/12 mx-auto h-auto mt-20 mb-28" >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold text-[#5A3E36]">Tea Grown Respectfully Tastes Better</h2>
          <p className="mt-4 text-gray-700">Curabitur eget turpis iaculis eleifend. Curabitur consectetur fermentum anteut eusmdolor convallis velli. Morbi psum purus venenatein semper eget.</p>
          <img src={Tea_Grown} alt="Coffee Bags" className="mt-6 " />
          
        </div>
        <div className="md:w-1/3 bg-[#57a642] p-8 rounded-lg mt-11 md:mt-0 md:ml-8  relative  " >
          <div className="flex items-start mb-6">
            <div className="bg-white p-3 rounded-full">
              <img src="path_to_sourcing_icon" alt="Sourcing" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white">Sourcing</h3>
              <p className="text-white">Curabitur eget turpis iaculis eleifend. Curconsec.</p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="bg-white p-3 rounded-full">
              <img src="path_to_roasting_icon" alt="Roasting" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white">Roasting</h3>
              <p className="text-white">Curabitur eget turpis iaculis eleifend. Curconsec.</p>
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="bg-white p-3 rounded-full">
              <img src="path_to_packaging_icon" alt="Packaging" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white">Packaging</h3>
              <p className="text-white">Curabitur eget turpis iaculis eleifend. Curconsec.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white p-3 rounded-full">
              <img src="path_to_delivery_icon" alt="Delivery" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white">Delivery</h3>
              <p className="text-white">Curabitur eget turpis iaculis eleifend. Curconsec.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
     
      <Footer />


>>>>>>> Stashed changes

      
        {/* 5 part  */}
        <div className="max-w-4xl mx-auto px-4 py-12 ">
      <h2 className="text-green-600 text-lg">what we offer</h2>
      <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      <p className="mb-8 text-gray-600">
        We offer a comprehensive range of services to ensure the smooth and efficient operation of your tea factory. From production management to customer service, we cover all aspects of tea factory management with expertise and dedication.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.title} className={`${service.color} p-6 rounded-lg flex flex-col items-center hover:scale-105`}>
            <span className="text-5xl text-white">{service.icon}</span>
            <h3 className="text-xl font-semibold mt-4 text-white">{service.title}</h3>
          </div>
        ))}
      </div>
      
    </div>

     {/* 5 part End  */}

      <Footer />

    </div>
    
  );
}

export default Home;
