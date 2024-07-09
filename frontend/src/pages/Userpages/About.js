import React from 'react';
import '../../App.css'; 
import Main1 from '../../assets/logo.png';
import Main2 from '../../assets/Equipment/main.jpg';
import Product1 from '../../assets/logo.png'; 
import Product2 from '../../assets/logo.png';
import Product3 from '../../assets/logo.png';

const About = () => {
  
  return (
    <section id="aboutSection" className="p-4">
      <div className="l relative bottom-28">
        <div className="bg-white w-11/12 mx-auto h-auto rounded-t-2xl relative shadow-inner">
          <h2 className=" text-green-600 font-bold text-4xl uppercase text-center mt-10 animate-bounce relative top-36 left-2">
            Soba Tea
          </h2>
          <div className="flex flex-col sm:flex-row items-center relative mt-10 sm:mt-20">
            <img
              src={Main1}
              alt="Tea Leaves"
              className="w-full sm:w-1/3 object-cover mb-4 sm:mb-0 skew-x-12 "
            />
            <div className="p-8 text-center sm:text-left">
              <h2 className="text-green-600 text-sm font-semibold uppercase mb-2">
                Featured Article
              </h2>
              <h1 className="text-4xl font-bold mb-4 ">
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
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
                Read More
              </button>
            </div>
          </div>

          <div className="mt-20">
            <div className="max-w-6xl mx-auto p-8">
              <h2 className="text-green-600 text-sm font-semibold uppercase text-center mb-2">
                Online Store
              </h2>
              <h1 className="text-4xl font-bold text-center mb-6">
                Want to stay healthy? Choose tea taste
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
                      className="w-40 scale-75 ... h-40 object-cover mx-auto transition-transform duration-300 transform group-hover:scale-105"
                    />
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.68a1 1 0 00.95.69h4.931c.969 0 1.372 1.24.588 1.81l-3.987 2.897a1 1 0 00-.364 1.118l1.518 4.68c.3.921-.755 1.688-1.54 1.118l-3.987-2.897a1 1 0 00-1.175 0l-3.987 2.897c-.785.57-1.84-.197-1.54-1.118l1.518-4.68a1 1 0 00-.364-1.118L2.486 10.107c-.784-.57-.381-1.81.588-1.81h4.931a1 1 0 00.95-.69l1.518-4.68z" />
                        </svg>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <a className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Add Card</a>
                  </div>
                ))}
              </div>

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
                      className=" scale-75 ... w-40 h-40 object-cover mx-auto transition-transform duration-300 transform group-hover:scale-105"
                    />
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.68a1 1 0 00.95.69h4.931c.969 0 1.372 1.24.588 1.81l-3.987 2.897a1 1 0 00-.364 1.118l1.518 4.68c.3.921-.755 1.688-1.54 1.118l-3.987-2.897a1 1 0 00-1.175 0l-3.987 2.897c-.785.57-1.84-.197-1.54-1.118l1.518-4.68a1 1 0 00-.364-1.118L2.486 10.107c-.784-.57-.381-1.81.588-1.81h4.931a1 1 0 00.95-.69l1.518-4.68z" />
                        </svg>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <a className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">Add Card</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Our Work</h2>
        <p className="text-lg mb-2">Here are some of our latest work.</p>
        <p className="text-md mb-8">Click on the images to make them bigger</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-4xl">
          {[...Array(8)].map((_, index) => (
            <img
              key={index}
              src={Main2}
              alt={`Work ${index + 1}`}
              className="w-full h-auto cursor-pointer transition-transform transform hover:scale-105 shadow-md"
            />
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default About;
