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

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, review, rating });
    // Clear form fields after submission
    setName('');
    setEmail('');
    setReview('');
    setRating(5);
  };

  return (

    <div>
      <div>
      <div class="font-sans">
            <div class="p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
                <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16">
                    <div class="w-full lg:sticky top-0 text-center">
                        <div class="lg:h-[560px]">
                            <img src="image1.jpg" alt="Product" class="lg:w-11/12 w-full h-full rounded-md object-cover object-top" />
                        </div>

                        <div class="flex flex-wrap gap-4 justify-center mx-auto mt-4">
                            <img src="image1.jpg" alt="Product1" class="w-16 cursor-pointer rounded-md outline" />
                            <img src="image1.jpg" alt="Product2" class="w-16 cursor-pointer rounded-md" />
                            <img src="image1.jpg" alt="Product3" class="w-16 cursor-pointer rounded-md" />
                            <img src="image1.jpg" alt="Product4" class="w-16 cursor-pointer rounded-md" />
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-wrap items-start gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-800">Ceylon Black Tea | Fairy Mount Tea</h2>
                                <p class="text-sm text-gray-500 mt-2">Well-Versed Commerce</p>
                            </div>

                            <div class="ml-auto flex flex-wrap gap-4">
                                <button type="button" class="px-2.5 py-1.5 bg-green-100 text-xs text-green-600 rounded-md flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="currentColor" class="mr-1" viewBox="0 0 64 64">
                                        <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                    </svg>
                                    100
                                </button>
                                <button type="button" class="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0" data-original="#000000" />
                                        <path d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0" data-original="#000000" />
                                        <path d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0" data-original="#000000" />
                                        <path d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0" data-original="#000000" />
                                        <path d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0" data-original="#000000" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <hr class="my-8" />

                        <div class="flex flex-wrap gap-4 items-start">
                            <div>
                                <p class="text-gray-800 text-4xl font-bold">Rs.550</p>
                                <p class="text-gray-500 text-sm mt-2"><strike>Rs.650</strike> <span class="text-sm ml-1">Tax included</span></p>
                            </div>

                            <div class="flex flex-wrap gap-4 ml-auto">
                                <button type="button" class="px-2.5 py-1.5 bg-green-100 text-xs text-green-600 rounded-md flex items-center">
                                    <svg class="w-3 mr-1" fill="currentColor" viewBox="0 0 14 13"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                    </svg>
                                    4.8
                                </button>
                                <button type="button" class="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3 mr-1" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z" data-original="#000000" />
                                        <path d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z" data-original="#000000" />
                                        <path d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z" data-original="#000000" />
                                    </svg>
                                    87 Reviews
                                </button>
                            </div>
                        </div>

                        <hr class="my-8" />

                        <div>
                            <h3 class="text-xl font-bold text-gray-800">Choose a Size</h3>
                            <div class="flex flex-wrap gap-4 mt-4">
                                <button type="button" class="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0">100g</button>
                                <button type="button" class="w-10 h-10 border hover:border-gray-800 border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0">200g</button>
                                <button type="button" class="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0">500g</button>
                                <button type="button" class="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0">1kg</button>
                            </div>
                        </div>

                        <hr class="my-8" />

                        <div>
                        <h3 class="text-xl font-bold text-gray-800">Quantity</h3>

                        <div class="flex divide-x border w-max mt-4 rounded overflow-hidden">
                            <button type="button" class="bg-green-100 w-12 h-10 font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current inline" viewBox="0 0 124 124">
                                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                </svg>
                            </button>
                            <button type="button" class="bg-transparent w-12 h-10 font-semibold text-gray-800 text-lg">
                                1
                            </button>
                            <button type="button" class="bg-green-800 text-white w-12 h-10 font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current inline" viewBox="0 0 42 42">
                                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                        <hr class="my-8" />

                        <div class="flex flex-wrap gap-4">
                            <button type="button" class="min-w-[200px] px-4 py-3 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold rounded-md">Buy now</button>
                            <button type="button" class="min-w-[200px] px-4 py-2.5 border border-green-800 bg-transparent hover:bg-gray-50 text-green-800 text-sm font-semibold rounded-md">Add to cart</button>
                        </div>
                    </div>
                </div>

                <div class="mt-20 max-w-4xl">
                    

                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-gray-800">Product Description</h3>
                        <p class="text-sm text-gray-500 mt-4">Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric ensures all-day comfort, making it perfect for everyday wear. Its classic crew neck and short sleeves offer a timeless look.</p>
                    </div>

                    <ul class="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
                        <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
                        <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                        <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                        <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>





      {/* Average Rating Section */}
      <div className="border border-gray-300 p-4 mb-6 rounded-xl">
        <h1 className="text-2xl font-bold">Average Rating</h1>
        <div className="flex items-center mb-2">
          {/* Star Ratings */}
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < 4 ? 'text-yellow-300' : 'text-gray-300'} me-1 dark:text-yellow-500`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">4.95</p>
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">out of</p>
          <p className="ms-1 text-sm font-medium text-gray-600 dark:text-gray-500">5</p>
        </div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-500">1,745 global ratings</p>

        {/* Rating Breakdown Section */}
        {['5 star', '4 star', '3 star', '2 star', '1 star'].map((star, index) => (
          <div className="flex items-center mt-4" key={index}>
            <a href="#" className="text-sm font-medium text-black-600 dark:text-black-500 hover:underline">{star}</a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded-xl dark:bg-gray-200">
              <div className="h-5 bg-green-500 rounded-xl" style={{ width: `${[75, 31, 15, 8, 4][index]}%` }}></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-500">{[75, 32, 15, 8, 4][index]}%</span>
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
                className={`w-6 h-6 ${index < rating ? 'text-yellow-500' : 'text-gray-300'} dark:text-yellow-500`}
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
            src={chatbotOpen ? "../close-chatbot.png" : "/open-chatbot.png"}
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
