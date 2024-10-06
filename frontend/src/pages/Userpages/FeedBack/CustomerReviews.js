import React, { useState } from 'react';

export default function CustomerReviews({ reviews = [] }) {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5); // State to track number of visible reviews
  const [isExpanded, setIsExpanded] = useState(false); // State to track if reviews are expanded

  const handleShowMore = () => {
    // Set visible reviews count to total number of reviews
    setVisibleReviewsCount(reviews.length);
    setIsExpanded(true); // Mark reviews as expanded
  };

  const handleShowLess = () => {
    // Reset visible reviews count to 5
    setVisibleReviewsCount(5);
    setIsExpanded(false); // Mark reviews as collapsed
  };

  return (
    <div className="container mx-auto p-4">
      {/* Customer Reviews Section */}
      <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.slice(0, visibleReviewsCount).map((review, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg flex items-start bg-white shadow-md">
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img 
                src={review.userImage || './user.png'} // Use default image if none provided
                alt={`${review.name}'s avatar`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{review.email}</p>
              {/* Star Rating */}
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27L16.18 20 14.54 13.97 20 9.24 13.81 8.63 10 2 6.19 8.63 0 9.24 5.46 13.97 3.82 20 10 15.27z" />
                  </svg>
                ))}
                {/* Handle cases with less than 5 stars (e.g., when rating is less) */}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27L16.18 20 14.54 13.97 20 9.24 13.81 8.63 10 2 6.19 8.63 0 9.24 5.46 13.97 3.82 20 10 15.27z" />
                  </svg>
                ))}
              </div>
              {/* Review Text */}
              <p className="text-sm text-gray-800">{review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to leave a review!</p>
      )}
      {/* Show More / Show Less Button */}
      {reviews.length > 5 && !isExpanded && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleShowMore} 
            className="bg-white text-green-500 py-2 px-4 rounded border border-green-500 hover:bg-green-50 transition"
          >
            ▼
          </button>
        </div>
      )}
      {isExpanded && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleShowLess} 
            className="bg-white text-green-500 py-2 px-4 rounded border border-green-500 hover:bg-green-50 transition"
          >
            ▲
          </button>
        </div>
      )}
    </div>
  );
}
