import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot'; 

export default function MainPage() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const reviews = [
    { name: 'Alice', review: 'Great service!', rating: 5 },
    { name: 'Bob', review: 'Good quality products.', rating: 4 },
    // Add more sample reviews if needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { name, email, review, rating, image };

    try {
      const response = await axios.post('http://localhost:5004/FeedBackadd', feedbackData);
      console.log(response.data);
      setSuccessMessage('Feedback submitted successfully!');
      setErrorMessage('');
      
      setName('');
      setEmail('');
      setReview('');
      setRating(5);
      setImage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to submit feedback. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our Feedback Page</h1>

      {/* Leave a Review Section */}
      <div className="border border-gray-300 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-bold">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Star Rating Selection */}
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15.27L16.18 20 14.54 13.97 20 9.24 13.81 8.63 10 2 6.19 8.63 0 9.24 5.46 13.97 3.82 20 10 15.27z" />
              </svg>
            ))}
          </div>

          {/* Text Inputs */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />
          <textarea
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />

          {/* Image Upload (optional) */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />

          <button
            type="submit"
            className="mt-4 bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900"
          >
            Submit
          </button>

          {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>

      {/* Reviews Display */}
      <div className="border border-gray-300 p-4 rounded-xl mb-4">
        <h2 className="text-xl font-bold">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <h3 className="font-semibold">{review.name} - {review.rating} Stars</h3>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Chatbot Button (Fixed Position) */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="p-3 bg-gray-300 rounded-full"
        >
          <img
            src="cccbot.png"
            alt="Open Chatbot"
            className="w-10 h-10"
          />
        </button>
      </div>

      {/* Chatbot Component */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
}
