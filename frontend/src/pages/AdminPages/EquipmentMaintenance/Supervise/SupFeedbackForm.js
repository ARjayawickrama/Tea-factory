import React, { useState } from 'react';
import axios from 'axios';

export default function FeedbackForm({ onClose }) {
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5004/EqFeedback', {
        area,
        name,
        feedback,
      });

      if (response.status === 200) {
        alert(`Feedback submitted successfully!\nArea: ${area}\nName: ${name}\nFeedback: ${feedback}`);
        console.log('Submitted Data:', { area, name, feedback });

        setSuccess('Feedback submitted successfully!');
        setArea('');
        setName('');
        setFeedback('');
        setTimeout(onClose, 2000); // Close the form after a delay
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting feedback. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="area" className="block text-gray-700">Area</label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
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
            required
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
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
