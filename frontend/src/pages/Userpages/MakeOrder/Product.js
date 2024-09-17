import React from 'react'
import Product1 from "../../../assets/type1.png";
import Product2 from "../../../assets/type2.png";
import Product3 from "../../../assets/type3.png";
import Product4 from "../../../assets/type3.png";
import Main from '../../../assets/imge4.jpg';
import NavbarComponent from '../../../components/Navigation_bar/User/NavbarComponent';
export default function Product() {
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
       
      </div>

      <div className="relative bottom-64">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-10/12 mx-auto mt-64">
          {[
            { src: Product1, name: "Chamomile Botanical Blend Sachets", price: "$4.00–$28.00", discount: "30% OFF" },
            { src: Product2, name: "Organic Dandelion & Peach Naturally", price: "$3.00–$21.00", discount: "30% OFF" },
            { src: Product3, name: "Chamomile Blend Organic Tea", price: "$5.00–$35.00", discount: "30% OFF" },
            { src: Product4, name: "Chamomile Botanical Blend Sachets", price: "$20.00–$140.00", discount: "30% OFF" },
            { src: Product1, name: "Chamomile Botanical Blend Sachets", price: "$4.00–$28.00", discount: "30% OFF" },
            { src: Product2, name: "Organic Dandelion & Peach Naturally", price: "$3.00–$21.00", discount: "30% OFF" },
            { src: Product3, name: "Chamomile Blend Organic Tea", price: "$5.00–$35.00", discount: "30% OFF" },
            { src: Product4, name: "Chamomile Botanical Blend Sachets", price: "$20.00–$140.00", discount: "30% OFF" },
            { src: Product1, name: "Chamomile Botanical Blend Sachets", price: "$4.00–$28.00", discount: "30% OFF" },
            { src: Product2, name: "Organic Dandelion & Peach Naturally", price: "$3.00–$21.00", discount: "30% OFF" },
            { src: Product3, name: "Chamomile Blend Organic Tea", price: "$5.00–$35.00", discount: "30% OFF" },
            { src: Product4, name: "Chamomile Botanical Blend Sachets", price: "$20.00–$140.00", discount: "30% OFF" },
            // Repeat the product items as needed
          ].map((product, index) => (
            <div
              key={index}
              className="text-center group mb-4 flex flex-col items-center shadow-lg w-full max-w-xs bg-white rounded-lg overflow-hidden"
            >
              <div className="relative">
                <span className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                  {product.discount}
                </span>
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <button className="mt-4 px-4 py-2 w-28 bg-green-600 text-white rounded-full hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}
