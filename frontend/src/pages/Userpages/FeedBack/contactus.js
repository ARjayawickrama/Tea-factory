import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center justify-between px-6 py-12">
        {/* Top section with illustration and text */}
        <div className="w-full flex items-center justify-between mb-8">
          {/* Left section with illustration */}
          <div className="w-1/2 flex justify-center">
            <img 
              src="cccc.png" 
              alt="Customer Support"
              className="h-96"
            />
          </div>

          {/* Right section with text */}
          <div className="w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-blue-900 mb-4">CONTACT US</h1>
            <p className="text-lg text-gray-600 mb-6">
              We’re here to help! Feel free to reach out if you have any questions, need support, or want to share feedback. Contact us directly, and we’ll get back to you soon.
            </p>
            {/* Contact information */}
            <p className="text-lg text-gray-700 mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Email:</strong> support@example.com
            </p>
          </div>
        </div>

        {/* Social media section */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Follow Us</h2>
          <div className="flex flex-col space-y-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="f.png" alt="Facebook" className="h-8 w-8 mr-2" />
              <span className="text-lg text-gray-700">Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="t.png" alt="Twitter" className="h-8 w-8 mr-2" />
              <span className="text-lg text-gray-700">Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="i.png" alt="Instagram" className="h-8 w-8 mr-2" />
              <span className="text-lg text-gray-700">Instagram</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="l.png" alt="LinkedIn" className="h-8 w-8 mr-2" />
              <span className="text-lg text-gray-700">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
