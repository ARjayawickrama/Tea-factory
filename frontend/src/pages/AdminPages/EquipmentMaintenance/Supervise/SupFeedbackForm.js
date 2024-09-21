// FeedbackForm.js
import React, { useState } from 'react';

export default function FeedbackForm({ onClose }) {
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log('Area:', area);
    console.log('Name:', name);
    console.log('Feedback:', feedback);
    onClose(); 
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label htmlFor="area" className="block text-gray-700">Area</label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-gray-700">Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
