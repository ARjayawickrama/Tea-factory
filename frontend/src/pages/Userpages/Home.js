// src/pages/Userspages/Home.js

import React, { useState, useEffect, useRef } from 'react';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import imge1 from '../../assets/new1.jpg';
import imge2 from '../../assets/imge2.jpg';
import imge3 from '../../assets/imge3.jpg';
import imge4 from '../../assets/new2.jpg';
import Footer from '../../components/footer/Footer';
import Alert from '../../components/Alert/Alert';
import About from './Home_content';
import teaImage from '../../assets/map.png';
import Contact from '../../components/Contacts/Contacts';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Nuwara Eliya:', value:20000},
  { name: 'Rathnapura', value: 17000 },
  { name: 'Akurassa', value: 12000 },
  { name: 'Bandarawela', value: 16000 },
  { name: 'Deniyaya', value: 10000},
  
];
const COLORS = ['#047A5B', '#0FFF13 ', '#9EDF9F ', '#6BB96C ', '#4AB500 '];

const images = [imge1, imge2, imge3, imge4];

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const slides = ["Sri Lanka's rich tea regions", "Nuwara Eliya", "Rathnapura", "Deniyaya", "Akurassa", "Bandarawela"];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  return (
    <div className="bg-white h-auto">
      <div className="min-h-screen flex flex-col">
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

      <About id="aboutSection" />
      <Alert />
      <NavbarComponent />

      <div id='areaSection'>
    
        <div className="bg-black w-full h-28 ">
          
          <div className="relative inset-0 flex flex-col items-center justify-center text-black  ">
            <div className="text-slider">
              {slides.map((slide, index) => (
                <div key={index} className={`text-slide ${index === currentSlide ? 'block' : 'hidden'}`}>
                  <h1 className="mt-4 text-4xl font-bold md:text-5xl text-white">{slide}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="relative inset-0 flex flex-col items-center justify-center text-black top-24 ">
       
          </div>
        </div>

        <div className="font-sans">
          <Contact isOpen={isOpen} closeForm={closeForm} />
        </div>

      </div>

      <button
        className="bg-green-600 text-white p-4 border-none cursor-pointer opacity-80 fixed bottom-6 right-7 w-72 hover:opacity-100"
        onClick={openForm}
      >
        Contact Now
      </button>
      <div className="flex flex-col lg:flex-row items-center bg-slate-50">
      <div className="lg:w-1/2 flex justify-center">
        <img src={teaImage} alt="Tea Bag" className="w-full h-auto max-w-xs lg:max-w-md ml-32 mt-7 mb-7" />
      </div>
      <PieChart width={500} height={500} className=' hover:scale-110'>
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
      <div className="lg:w-1/2 p-8">
        <h2 className="text-4xl font-bold mb-4 ">Sri Lanka's rich  <span className="text-green-600">tea regions</span></h2>
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
      <Footer />
    </div>
  );
}

export default Home;