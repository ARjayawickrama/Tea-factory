import React, { useState } from 'react';
import Chatbot from './Chatbot'; // Adjust the import path if necessary

export default function MainPage() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const reviews = [
    { id: 1, name: "John Doe", rating: 5, text: "Great product!" },
    { id: 2, name: "Jane Smith", rating: 4, text: "Very good, but could be improved." },
    { id: 3, name: "Alice Johnson", rating: 5, text: "Loved it!" },
    { id: 4, name: "Bob Brown", rating: 4, text: "Satisfied with the purchase." },
    { id: 5, name: "Emily Davis", rating: 5, text: "Excellent service and quality!" },
    { id: 6, name: "Frank Green", rating: 4, text: "Would buy again." },
    { id: 7, name: "Grace Lee", rating: 5, text: "Highly recommend!" },
    { id: 8, name: "Harry White", rating: 3, text: "It’s okay." },
    { id: 9, name: "Ivy Black", rating: 5, text: "Amazing!" },
    { id: 10, name: "Jack Gray", rating: 4, text: "Pretty good." },
    { id: 11, name: "Karen Miller", rating: 5, text: "Superb quality!" },
    { id: 12, name: "Liam Moore", rating: 4, text: "Happy with the product." },
    { id: 13, name: "Mia Wilson", rating: 5, text: "Exceeded expectations!" },
    { id: 14, name: "Noah Taylor", rating: 4, text: "Good value for money." },
    { id: 15, name: "Olivia Anderson", rating: 5, text: "Perfect!" },
  ];

  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(2);
  const ratingBreakdown = [0, 0, 0, 0, 0];
  reviews.forEach(review => ratingBreakdown[5 - review.rating]++);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, review, rating });
    setName('');
    setEmail('');
    setReview('');
    setRating(5);
  };

  return (
    <div className="p-6">
      {/* Average Rating Section */}
      <div className="border border-gray-300 p-4 mb-6 rounded-xl">
        <h1 className="text-2xl font-bold">Average Rating</h1>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-300'} me-1 dark:text-yellow-500`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">{averageRating}</p>
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">out of</p>
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">5</p>
        </div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-500">{reviews.length} global ratings</p>

        {/* Rating Breakdown Section */}
        {['5 star', '4 star', '3 star', '2 star', '1 star'].map((star, index) => (
          <div className="flex items-center mt-4" key={index}>
            <a href="#" className="text-sm font-medium text-black-600 dark:text-black-500 hover:underline">{star}</a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded-xl dark:bg-gray-200">
              <div className="h-5 bg-green-500 rounded-xl" style={{ width: `${ratingBreakdown[index] * 100 / reviews.length}%` }}></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-500">{Math.round(ratingBreakdown[index] * 100 / reviews.length)}%</span>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        {displayedReviews.map((review) => (
          <div key={review.id} className="mt-4 border border-gray-300 p-4 rounded-xl">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'} dark:text-yellow-500`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <p className="ms-2 text-sm font-medium text-gray-600 dark:text-gray-500">{review.rating} out of 5</p>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">{review.text}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">- {review.name}</p>
          </div>
        ))}
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 text-green-800 font-bold hover:underline text-center"
        >
          {showAllReviews ? 'Show Less' : 'Show All'}
        </button>
      </div>

      {/* Review Form Section */}
      <div className="border border-gray-300 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-300'} dark:text-gray-500`}
                onClick={() => setRating(index + 1)}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-500">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-500">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-600 dark:text-gray-500">Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Toggle Chatbot Button */}
      <div className="fixed bottom-4 left-4">
        <button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="p-3 bg-gray-300 rounded-full"
        >
          <img
            src={chatbotOpen ? "/close-chatbot.png" : "/open-chatbot.png"}
            alt={chatbotOpen ? "Close Chatbot" : "Open Chatbot"}
            className="w-10 h-10"
          />
        </button>
      </div>

      {/* Add Chatbot Component */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
}
