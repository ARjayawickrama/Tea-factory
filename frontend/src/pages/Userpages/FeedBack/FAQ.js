import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'How long does it take for the delivery and what are the charges?',
      answer: 'Delivery usually takes 3-5 business days, and the charges depend on your location and the size of the order.',
    },
    {
      question: 'What is SimplyTek’s return and refund policy?',
      answer: 'You can return products within 30 days of purchase for a full refund, subject to terms and conditions.',
    },
    {
      question: 'What is the warranty period for electronics?',
      answer: 'Most electronics come with a 1-year warranty. Please check the specific product details for more information.',
    },
  ];

  return (
    <div className="bg-green-600 text-white p-12 rounded-2xl w-full md:w-5/6 lg:w-11/12 xl:w-full mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-white last:border-none">
            <div
              className="flex justify-between items-center py-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{item.question}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
              >
                &#9662;
              </span>
            </div>
            {activeIndex === index && (
              <div className="text-gray-200 text-sm py-2">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
