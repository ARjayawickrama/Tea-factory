import React, { useState, useRef } from 'react';

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
          <h1 className="font-bold mb-4 text-6xl">Equipment Maintenances</h1>
          <h2 className="text-2xl font-bold text-white mb-24">
            We are a team of <span className="text-green-500">Jlcniyon Service</span>
          </h2>
        </div>
      </div>

      

    





      <Footer />
    </div>
  );
};

export default Equipment;
