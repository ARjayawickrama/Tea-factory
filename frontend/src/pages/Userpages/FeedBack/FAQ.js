import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
      {
        question: 'What types of tea do you produce?',
        answer: 'We produce a variety of teas, including black, green, white, oolong, and herbal teas, sourced from our own tea gardens.',
      },
      {
        question: 'How can I place an order for tea?',
        answer: 'Orders can be placed through our website or by contacting our sales team directly. We offer bulk purchasing options for retailers and businesses.',
      },
      {
        question: 'What are the benefits of your organic teas?',
        answer: 'Our organic teas are grown without synthetic fertilizers or pesticides, offering a healthier choice with a rich, authentic flavor profile.',
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
