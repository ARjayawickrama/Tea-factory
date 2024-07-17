import React, { useState } from 'react';
import Main from '../../assets/imge1.jpg';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import Footer from '../../components/footer/Footer';
import img1 from '../../assets/new1.jpg';
import img2 from '../../assets/imge2.jpg';
import img3 from '../../assets/imge3.jpg';
import img4 from '../../assets/new2.jpg';

export default function Gallery() {
  const [popupImage, setPopupImage] = useState(null);

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

  const handleImageClick = (image) => {
    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  return (
    <div>
      <NavbarComponent />
      <div style={containerStyle} className="bg-black bg-opacity-50 text-center p-4">
        <div className="text-white bg-opacity-70 rounded-md absolute left-40 bottom-52">
          <h1 className="font-bold mb-4 text-6xl">Our Gallery</h1>
          <h2 className="text-2xl font-bold text-white mb-24"></h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 w-9/12 mt-36 ml-44  ">
      <div class=' relative top-16 hover:scale-105'>
  <h2 class="text-6xl font-bold text-center relative bottom-6">
    Our<span class="text-green-600"> Gallery</span>
  </h2>
  <p>Step inside a world of rolling green hills and fragrant aromas. Explore our tea 
    factory gallery and discover the fascinating process of transforming tea leaves into
     your favorite cup of tea.</p>
</div>
        <div className="relative ml-30" onClick={() => handleImageClick(img1)}>
          <img src={img1} className="w-full h-full object-cover " />
        </div>

        <div className="relative " onClick={() => handleImageClick(img2)}>
          <img src={img2}  className="w-full h-full object-cover" />
        </div>
        <div className="relative" onClick={() => handleImageClick(img3)}>
          <img src={img3} alt="Desert Landscape" className="w-full h-full object-cover" />
        </div>
  
        <div className="relative" onClick={() => handleImageClick(img4)}>
          <img src={img4} alt="Mountain Range" className="w-full h-full object-cover  " />
        </div>
        <div className="relative" onClick={() => handleImageClick(img4)}>
          <img src={img4} alt="Mountain Range" className="w-full h-full object-cover  " />
        </div>
        
        <div className="relative" onClick={() => handleImageClick(img4)}>
          <img src={img3} alt="Mountain Range" className="w-full h-full object-cover  " />
        </div>
        <div className="relative" onClick={() => handleImageClick(img4)}>
          <img src={img4} alt="Mountain Range" className="w-full h-full object-cover  " />
        </div>
       
        <div class=' relative top-12 hover:scale-105'>
  <h2 class="text-6xl font-bold text-center relative bottom-6">
    Our<span class="text-green-600"> Gallery</span>
  </h2>
  <p>Step inside a world of rolling green hills and fragrant aromas. Explore our tea 
    factory gallery and discover the fascinating process of transforming tea leaves into
     your favorite cup of tea.</p>
</div>
      </div>
      

      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 w-8/12 ml-56">
          <div className="relative">
            <img src={popupImage} alt="Popup" className="max-w-full max-h-full" />
            <button
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full px-2 py-1"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

        <Footer />
    </div>
  );
}
