import React, { useState, useEffect, useRef } from "react";
import "../../App.css";
import Main1 from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Product1 from "../../assets/tea1.png";
import Product2 from "../../assets/tea2.png";
import Product3 from "../../assets/tea3.png";
import AboutContent from "./AboutContent";
import equipmentImage from "../../assets/Equipment/machine.png";

const teaCategories = [
  {
    name: "Fruit Tea",
    src: Product1,
    description: "Donec fermentum nunc nenunc rutrum, ut pretium quam.",
  },
  {
    name: "Green Tea",
    src: Product2,
    description: "Donec fermentum nunc nenunc rutrum, ut pretium quam.",
  },
  {
    name: "Black Tea",
    src: Product3,
    description: "Donec fermentum nunc nenunc rutrum, ut pretium quam.",
  },
];

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
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <section id="aboutSection">
      <div className="relative bottom-6 bg-green-900 text-white">
        <img
          src={Main1}
          alt="Tea Leaves"
          className="w-44 mb-4 relative left-1/2 transform -translate-x-1/2 top-14"
        />
        <div className="w-7/12 mx-auto h-auto py-16 mb-14">
          <h2 className="text-white text-4xl font-extrabold mb-6 uppercase text-center">
            Welcome to Our Tea Store
          </h2>
          <p className="text-center mt-4 text-lg">
            We are a family-run company founded on a passion for tea. Our
            Chairman made a promise to never sell tea he wouldn’t drink at home.
            Learn how we stay true to those values in everything we do.
          </p>
          <div className="text-center mt-8">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
              onClick={handleClick}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* AboutContent Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full relative"
          >
            <AboutContent />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* AboutContent Popup End */}
    </section>
  );
};

export default Home_content;
