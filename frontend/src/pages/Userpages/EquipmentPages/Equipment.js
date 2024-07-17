import React, { useState, useRef } from 'react';
import equipmentImage from '../../../assets/Equipment/machine.png';
import NavbarComponent from '../../../components/Navigation_bar/User/NavbarComponent';
import Main from '../../../assets/Equipment/34.jpg';
import service from '../../../assets/Equipment/service.png';
import Footer from '../../../components/footer/Footer';
import ServerRestorationForm from '../../../components/equipment_maintenance/ServerRestorationForm'; 
import EquipmentForm from '../../../components/equipment_maintenance/EquipmentForm'; 

const Equipment = () => {
  const [showServerRestorationForm, setServerRestorationForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const formRef = useRef(null);

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${Main})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  };

  const toggleServerRestorationForm = () => {
    setServerRestorationForm(!showServerRestorationForm);
  };

  const toggleEquipmentForm = () => {
    setShowEquipmentForm(!showEquipmentForm);
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setServerRestorationForm(false);
      setShowEquipmentForm(false);
    }
  };


  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <NavbarComponent />

      <div style={containerStyle} className="bg-black bg-opacity-50 text-center p-4">
        <div className="text-white bg-opacity-70 rounded-md absolute left-40 bottom-52">
          <h1 className="font-bold mb-4 text-6xl">Equipment Maintenance</h1>
          <h2 className="text-2xl font-bold text-white mb-24">
            We are a team of <span className="text-green-500">Jlcniyon Service</span>
          </h2>
        </div>
      </div>

      <div className="relative p-8 bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 ">
          <h2 className="text-6xl font-bold text-gray-800 mb-9 ml-32 ">
            Our <span className="text-green-500">Service</span>
          </h2>
          <p className="text-gray-600 mb-8">
            We provide the best quality with our services designed to meet all your needs.
          </p>
          <div className="mb-4 p-4 bg-yellow-500 text-white rounded-md hover:scale-105">
            <h3 className="text-2xl font-semibold">Equipment Maintenance</h3>
            <p>We provide a wide range of equipment essential for tea production, including machinery for plucking, withering, rolling, and drying. Our catalog features the latest technology to enhance efficiency and quality.</p>
          </div>
          <div className="p-4 bg-gray-800 text-white rounded-md mb-4 hover:scale-105">
            <h3 className="text-2xl font-semibold">Flexible Maintenance Plans</h3>
            <p>Our flexible maintenance plans are designed to fit your schedule and budget. Whether you need regular servicing or emergency repairs, our skilled technicians are ready to keep your equipment in top condition.</p>
          </div>
          <div className="mb-4 p-4 bg-yellow-500 text-white rounded-md hover:scale-105">
            <h3 className="text-2xl font-semibold">Expert Technical Support</h3>
            <p>Our team of experts offers technical support to troubleshoot and resolve any equipment issues promptly. We ensure minimal downtime, so your tea production process remains uninterrupted.</p>
          </div>
        </div>

        <div className="md: relative right-5">
          <img src={equipmentImage} alt="Equipment" className="object-cover w-full h-full rounded-lg" />
        </div>
      </div>

      <div className="bg-green-800 text-white py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-4">
          <div>
            <h2 className="text-4xl font-bold hover:animate-bounce">32</h2>
            <p >Service</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold hover:animate-bounce">221</h2>
            <p >Projects</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold hover:animate-bounce" animate-bounce>53</h2>
            <p >Service Area</p>
          </div >
          <div>
            <h2 className="text-4xl font-bold hover:animate-bounce">500</h2>
            <p >Workers</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-24 mb-16">
        <button onClick={toggleServerRestorationForm} className="mr-32 w-64 h-56 text-2xl  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Server Restoration
        </button>

        <div className="flex flex-col items-center">
          <img src={service} alt="Service" className="object-cover w-96 h-full rounded-lg" />
        </div>

        <button onClick={toggleEquipmentForm} className="ml-32 w-64 h-56 text-2xl bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Equipment Repairs
        </button>
      </div>

      {showServerRestorationForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={formRef} className="bg-white p-8 rounded-md">
            <button onClick={toggleServerRestorationForm} className="absolute top-4 right-4 text-2xl font-bold text-black">&times;</button>
            <ServerRestorationForm />
          </div>
        </div>
      )}

      {showEquipmentForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={formRef} className="bg-white p-8 rounded-md">
            <button onClick={toggleEquipmentForm} className="absolute top-4 right-4 text-2xl font-bold text-black">&times;</button>
            <EquipmentForm />
          </div>
        </div>
      )}





      <Footer />
    </div>
  );
};

export default Equipment;
