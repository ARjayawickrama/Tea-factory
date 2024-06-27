import React from 'react';
import Main from '../../assets/pages_images/equipment.png';

import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';

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

const Equipment = () => {
  const token = localStorage.getItem('token');
  return (
    <div>
     
      
      <div style={containerStyle} className="bg-black bg-opacity-50 text-center p-4">
        <div className="text-white bg-opacity-70 rounded-md  absolute left-40 bottom-52  ">
          <h1 className="text-4xl font-bold mb-4">Equipment Maintenance</h1>
          <p className="mb-6">We are a team of MR service</p>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter email address"
              className="p-3 rounded-l-md border-0 outline-none text-black bg-white focus:ring-2 focus:ring-orange-600"
            />
            {token && (
            <button className="p-3 bg-orange-600 text-white rounded-r-md hover:bg-orange-700 transition">
              Sign up
            </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-white py-3">
       
       
      </div>
    
      <div className="max-w-7xl mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
    
        <div className="bg-white p-6 rounded shadow-md space-y-2">
          <div className="text-red-500 text-2xl">🏢</div>
          <h3 className="text-xl font-bold text-gray-900">Eius provident</h3>
          <p className="text-gray-700">
            Magni repellendus vel ullam hic officia accusantium ipsa dolor omnis dolor voluptatem.
          </p>
        </div>
       
        <div className="bg-white p-6 rounded shadow-md space-y-2">
          <div className="text-orange-500 text-2xl">📂</div>
          <h3 className="text-xl font-bold text-gray-900">Rerum aperiam</h3>
          <p className="text-gray-700">
            Autem saepe animi et aut aspernatur culpa facere. Rerum saepe rerum voluptates quia.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded shadow-md space-y-2">
          <div className="text-pink-500 text-2xl">🔗</div>
          <h3 className="text-xl font-bold text-gray-900">Veniam omnis</h3>
          <p className="text-gray-700">
            Omnis perferendis molestias culpa sed. Recusandae quas possimus. Quod consequatur corrupti.
          </p>
        </div>
     
        <div className="bg-white p-6 rounded shadow-md space-y-2">
          <div className="text-pink-400 text-2xl">📈</div>
          <h3 className="text-xl font-bold text-gray-900">Delares sapiente</h3>
          <p className="text-gray-700">
            Sint et dolor voluptas minus possimus nostrum. Reiciendis commodi eligendi omnis quidem lorenda.
          </p>
        </div>

      </div>
      <div className='bg-black w-5/5 h-screen'>
      <div className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center px-4">
          <div>
            <h2 className="text-4xl font-bold">232</h2>
            <p>Clients</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">521</h2>
            <p>Projects</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">1453</h2>
            <p>Hours of Support</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">32</h2>
            <p>Workers</p>
          </div>
        </div>
      </div>
 
      </div>
      <NavbarComponent />
    </div>
  );
};

export default Equipment;
