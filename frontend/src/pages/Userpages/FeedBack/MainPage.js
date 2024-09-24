import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';

export default function MainPage() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Function to handle image file selection (up to 5 images)
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length <= 5) {
      const newImages = selectedFiles.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    } else {
      setErrorMessage('You can only upload up to 5 images.');
    }
  };

  // Function to remove an image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { name, email, review, rating, images };

    try {
      const response = await axios.post('http://localhost:5004/Feedbacks', feedbackData);
      console.log(response.data);
      setSuccessMessage('Feedback submitted successfully!');
      setErrorMessage('');

      // Clear form fields
      setName('');
      setEmail('');
      setReview('');
      setRating(5);
      setImages([]);
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
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-500">Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-500">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-500">Review</label>
          <textarea
            placeholder="Enter Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full rounded"
            required
          />

          {/* Image Upload (optional, up to 5 images) */}
          <div className="mt-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-900 dark:text-gray-500">
              📸 Upload Images (up to 5)
            </label>
            <div className="mt-2 flex items-center">
              <label
                htmlFor="image"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-green-500 text-green-500 text-sm font-medium rounded-md shadow-sm bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Choose Files
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
            {/* Display selected images */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Uploaded Preview ${index + 1}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <button
                      type="button"
                      className="absolute top-0 right-0"
                      onClick={() => removeImage(index)}
                    >
                      ❎
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
