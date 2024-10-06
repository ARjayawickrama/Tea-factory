import React from 'react';

const calculateRatingData = (reviews) => {
  const totalRatings = reviews.length;

  if (totalRatings === 0) 
    return { averageRating: 0, ratingDistribution: Array(5).fill(0), totalRatings };

  const ratingDistribution = Array(5).fill(0); // Create an array for 5-star distribution

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[review.rating - 1]++; // Increment the appropriate star index
    }
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalRatings;

  return { averageRating, ratingDistribution, totalRatings };
};

export default function RatingScorecard({ reviews = [] }) {
  const { averageRating, ratingDistribution, totalRatings } = calculateRatingData(reviews);

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < Math.round(averageRating) ? 'text-yellow-300' : 'text-gray-300'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-600 ml-2">{averageRating.toFixed(2)}</p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-600">out of</p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-600">5</p>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-600">{totalRatings} global ratings</p>
      {ratingDistribution.map((count, index) => (
        <div key={index} className="flex items-center mt-4">
          <span className="text-sm font-medium text-gray-400 dark:text-gray-800">{1 + index} star</span>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-300">
            <div className="h-5 bg-green-500 rounded" style={{ width: `${(count / totalRatings) * 100}%` }}></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-800">{totalRatings > 0 ? ((count / totalRatings) * 100).toFixed(0) : 0}%</span>
        </div>
      ))}
    </div>
  );
}
