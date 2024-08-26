import React from 'react';
import equipmentImage from '../../../assets/Equipment/machine.png';

const Equipment = () => {
  return (
    <div>
      <div className="text-center bg-yellow-700 py-8 relative bottom-40" id="equipment">
        <p className="text-white text-lg max-w-3xl mx-auto">
          We offer a comprehensive range of services to ensure the smooth and
          efficient operation of your tea factory. From production management
          to customer service, we cover all aspects of tea factory management
          with expertise and dedication.
        </p>
      </div>
      
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative bottom-32">
        <div className="space-y-4">
          <div className="p-4 bg-green-900 text-white rounded-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Equipment Maintenance</h3>
            <p>
              We provide a wide range of equipment essential for tea production,
              including machinery for plucking, withering, rolling, and drying.
              Our catalog features the latest technology to enhance efficiency
              and quality.
            </p>
          </div>
          <div className="p-4 bg-lime-700 text-white rounded-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Flexible Maintenance Plans</h3>
            <p>
              Our flexible maintenance plans are designed to fit your schedule
              and budget. Whether you need regular servicing or emergency
              repairs, our skilled technicians are ready to keep your equipment
              in top condition.
            </p>
          </div>
          <div className="p-4 bg-yellow-700 text-white rounded-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Expert Technical Support</h3>
            <p>
              Our team of experts offers technical support to troubleshoot and
              resolve any equipment issues promptly. We ensure minimal downtime,
              so your tea production process remains uninterrupted.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img
            src={equipmentImage}
            alt="Equipment"
            className="object-cover w-full h-auto rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default Equipment;
