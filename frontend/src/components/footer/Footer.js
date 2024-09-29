import React from 'react';

export default function Footer() {
  return (
    <div className="bg-stone-900 text-white  py-10 ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h6 className="text-white font-bold mb-4">Our Office</h6>
            <p>No 27 Deniyaya Patthe gama</p>
            <p>0776918174</p>
            <p>FairyMountinfo@example.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#"><i className="fab fa-twitter text-white "></i></a>
              <a href="#"><i className="fab fa-facebook-f text-white "></i></a>
              <a href="#"><i className="fab fa-youtube text-white "></i></a>
              <a href="#"><i className="fab fa-linkedin text-white "></i></a>
            </div>
          </div>
          <div>
            <h6 className="text-white  font-bold mb-4">Quick Links</h6>
            <ul>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Our Services</a></li>
              <li><a href="#" className="hover:text-white">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-white  font-bold mb-4">Business Hours</h6>
            <p>Monday - Friday: 09:00 am - 07:00 pm</p>
            <p>Saturday: 09:00 am - 12:00 pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div>
            <h6 className="text-white  font-bold mb-4">Newsletter</h6>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>

          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-gray-800 pt-6">
        <p>© Soba Tea</p>
      </div>
    </div>
  );
}
