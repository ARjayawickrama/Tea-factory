import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import Main1 from '../../assets/logo.png';
import Work1 from '../../assets/imge3.jpg';
import Work2 from '../../assets/imge3.jpg';
import Work3 from '../../assets/imge3.jpg';
import Work4 from '../../assets/imge3.jpg';
import { useNavigate } from 'react-router-dom';
import Product1 from '../../assets/teaaa1.png';
import Product2 from '../../assets/teaaa1.png';
import Product3 from '../../assets/teaaa1.png';
import AboutContent from './AboutContent';

const Home_content = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  return (
    <section id="aboutSection" className="p-4 ">
      <div className="relative bottom-28 ">
        <div className="bg-white  w-9/12 mx-auto h-auto rounded-t-2xl border-white rounded-bl-full  ">
          <h2 className="text-green-600 font-bold text-4xl uppercase text-center mt-10 animate-bounce relative top-36 left-2 ">
            Soba Tea
          </h2>
          <div className="flex flex-col sm:flex-row items-center relative mt-10 sm:mt-20">
            <img
              src={Main1}
              alt="Tea Leaves"
              className="w-full sm:w-1/3 object-cover mb-4 sm:mb-0 skew-x-12"
            />
            <div className="p-8 text-center sm:text-left">
              <h2 className="text-green-600 text-sm font-semibold uppercase mb-2">
                Featured Article
              </h2>
              <h1 className="text-4xl font-bold mb-4">
                The history of tea leaf in the world
              </h1>
              <hr className="border-t-2 border-green-500 w-1/4 mb-4 mx-auto sm:mx-0" />
              <p className="text-gray-700 mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet.
              </p>
              <p className="text-gray-700 mb-6">
                Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita
                erat ipsum et lorem et sit, sed stet lorem sit clita duo justo
                magna. Tempor erat elitr rebum at clita.
              </p>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                onClick={handleClick}
              >
                Read More
              </button>
            </div>
          </div>

          <div className="mt-20 rounded-r-full rounded-bl-full border-green-500 border-l-4">
            <div className="max-w-6xl mx-auto p-8">
              <h2 className="text-green-600 text-sm font-semibold uppercase text-center mb-2">
              Categories
              </h2>
              <h1 className="text-4xl font-bold text-center mb-6">
              Choose Your Tea
              </h1>
              <hr className="border-t-2 border-green-500 w-1/4 mx-auto mb-6" />
              <div className="flex flex-col sm:flex-row justify-around">
                {[
                  { src: Product1, name: 'Nature close tea' },
                  { src: Product2, name: 'Green tea tulsi' },
                  { src: Product3, name: 'Instant tea premix' },
                ].map((product, index) => (
                  <div key={index} className="text-center relative group mb-4 sm:mb-0">
                    <img
                      src={product.src}
                      alt={product.name}
                      className="w-72 h-80 object-cover mx-auto transition-transform duration-300 transform group-hover:scale-105"
                    />
             
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='  w-9/12 mx-auto h-auto rounded-t-2xl rounded-bl-full  '>
      <div className="text-center mb-12  relative bottom-32 ">
        <div className="text-lime-700  min-h-screen flex flex-col items-center justify-center rounded-r-full  rounded-bl-full  border-green-500 ">
          <h1 className="text-5xl font-bold mb-2 text-amber-800 ">Our work</h1>
          <h2 className="text-2xl font-bold mb-4">Soba Tea</h2>
          <p className="text-lg max-w-md text-center mb-8 text-black">
            At Soba Tea, we ensure quality and sustainability in every tea
            production stage, from sourcing to delivery, engaging local
            communities for positive environmental impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-4xl">
            {[Work1, Work2, Work3, Work4].map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Work ${index}`}
                  className="cursor-pointer filter grayscale hover:grayscale-0 duration-300 rounded-lg transform scale-100 hover:scale-110"
                  style={{ width: '250px', height: '250px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="  rounded-lg p-8 mx-4 max-w-4xl relative"
            ref={modalRef}
          >
            <AboutContent />
          </div>
          <button
            className="absolute top-2 right-2 text-white rounded-full px-3 py-1"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
      
    </section>
  );
};

export default Home_content;
