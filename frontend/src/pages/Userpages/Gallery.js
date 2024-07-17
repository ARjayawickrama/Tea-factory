import React from 'react'
import Main from '../../assets/imge1.jpg';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
export default function Gallery() {
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

  return (
    <div>
      <NavbarComponent />
           <div style={containerStyle} className="bg-black bg-opacity-50 text-center p-4">
        <div className="text-white bg-opacity-70 rounded-md absolute left-40 bottom-52">
          <h1 className="font-bold mb-4 text-6xl"> Oure Gllery</h1>
          <h2 className="text-2xl font-bold text-white mb-24">
   
          </h2>
        </div>
      </div>
       
    </div>
  )
}
