import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import NavbarComponent from '../../components/Navigation_bar/User/NavbarComponent';
import imge1 from '../../assets/new1.jpg';
import imge2 from '../../assets/imge2.jpg';
import imge3 from '../../assets/imge3.jpg';
import imge4 from '../../assets/new2.jpg';
import Alert from '../../components/Alert/Alert';

const containerStyle = {
  background: 'linear-gradient(to right, #ffecd2, #fcb69f)',
};

const images = [
  { src: imge1, name: 'Ceylon Black Tea rich in "Theacflavins"' },
  { src: imge2, name: 'Story of Ceylon Tea' },
  { src: imge3, name: 'Tea diversity' },
  { src: imge4, name: 'Perfect cup of tea' },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col " style={containerStyle}>
      <div className="flex-grow ">
        <Slide duration={2000} autoplay={true} >
          {images.map((image, index) => (
            <div
              key={index}
              className="each-slide flex flex-col justify-center items-center h-screen text-center"
              style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="text-white text-4xl font-bold mb-4">{image.name}</span>
              <a
                href="#" className="text-white text-lg bg-gray-00 bg-opacity-10 hover:bg-opacity-70 px-4 py-2 rounded mt-2" > Read More</a>
            </div>
          ))}
        </Slide>
        <NavbarComponent />
      </div>
      <div className=' bg-white w-full h-full'>
        <div className='flex flex-col justify-center items-center h-full'>
      
        </div>
        <Alert />


      </div>
     
    </div>
  );
}

export default Home;
