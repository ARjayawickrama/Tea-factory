import React from 'react';

const ContactUs = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-8">
      {/* Video Background */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="contactus.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Contact Title */}
      <div className="relative z-10 text-center text-white mb-8">
        <h1 className="text-4xl font-bold">Contact us</h1>
        <p className="mt-4 text-lg">We’re here to help! Feel free to reach out if you have any questions, need support, or want to share feedback.<br/> Contact us directly, and we’ll get back to you soon.</p>
      </div>

      {/* Main Content: Map Left and Social Media Right */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-md">
        
        {/* Map Section - Left Side */}
        <div className="md:w-1/2 w-full mb-6 md:mb-0 md:pr-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.941392257918!2d80.49882137481659!3d6.271437793717283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae15ef8efebced9%3A0xaa80d292af974fad!2sFairy%20Mount%20Tea%20Factory!5e0!3m2!1sen!2slk!4v1728187887598!5m2!1sen!2slk"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fairy Mount Tea Factory Location"
          ></iframe>
        </div>

        {/* Contact Info Section - Right Side */}
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start space-y-4">
          <div className="flex flex-col space-y-1 text-gray-800">
            <span className="font-bold">Address:</span>
            <span>7GC2+HHC,<br/> A17,<br/> Morawaka</span>
          </div>
          <div className="flex flex-col space-y-1 text-gray-800">
            <span className="font-bold">Phone:</span>
            <a href="tel:+94412282527" className="text-blue-600 hover:text-blue-800">
              +94 412 282 527
            </a>
          </div>
          <div className="space-y-2">
            <a href="https://twitter.com" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <img src="t.png" alt="Twitter" className="h-6 w-6" />
              <span>FairyMount/X</span>
            </a>
            <a href="https://facebook.com" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <img src="f.png" alt="Facebook" className="h-6 w-6" />
              <span>FairyMount/Facebook</span>
            </a>
            <a href="https://linkedin.com" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <img src="l.png" alt="LinkedIn" className="h-6 w-6" />
              <span>FairyMount/LinkedIn</span>
            </a>
            <a href="https://instagram.com" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <img src="i.png" alt="Instagram" className="h-6 w-6" />
              <span>FairyMount/Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
