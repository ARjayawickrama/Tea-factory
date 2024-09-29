import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
      {
        question: 'How should I store my tea?',
        answer: 'To preserve freshness, store tea in a cool, dry place, away from direct sunlight and moisture. For best results, keep it in an airtight container.',
      },
      {
        question: 'What is the shelf life of the tea?',
        answer: 'Generally, loose-leaf tea and tea bags last 18-24 months if stored properly. However, for optimal flavor, we recommend consuming within one year of purchase.',
      },
      {
        question: 'Can I add milk or sweeteners to your tea?',
        answer: 'Yes! Many of our teas, especially black and chai varieties, pair well with milk and sweeteners. However, delicate teas like green and white are best enjoyed on their own to preserve their natural flavors.',
      },
      {
        question: 'Are your tea bags biodegradable?',
        answer: 'Yes, our tea bags are made from biodegradable materials and are plastic-free to reduce environmental impact.',
      },
      {
        question: 'Can I reuse my tea leaves?',
        answer: 'Yes, many loose-leaf teas can be steeped multiple times. Each steeping will bring out different flavors. We recommend re-steeping green, oolong, and white teas up to 2-3 times.',
      },
      {
        question: 'Can pregnant women drink your tea?',
        answer: 'Certain teas,  may be safe for pregnant women, but it is always recommended to consult with a healthcare provider before consuming herbal or caffeinated teas during pregnancy.',
      },
      {
        question: 'How do I brew the perfect cup of tea?',
        answer: 'For the best results:Black tea: Use boiling water (100°C or 212°F) and steep for 3-5 minutes.Green tea: Use water at 80-85°C (175-185°F) and steep for 2-3 minutes.Herbal tea: Use boiling water (100°C or 212°F) and steep for 5-7 minutes. Adjust the steeping time to suit your taste.',
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
