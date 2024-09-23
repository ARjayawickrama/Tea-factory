import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function SupervisorIssue() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedback data when the component loads
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5004/EqFeedback');
        setFeedbackData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to load feedback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Function to handle deletion of feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/EqFeedback/${id}`);
      setFeedbackData((prevData) => prevData.filter((item) => item._id !== id));
      setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
      alert('Feedback deleted successfully!');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback.');
    }
  };

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredData(feedbackData);
    } else {
      setFilteredData(
        feedbackData.filter((item) =>
          item.name.toLowerCase().includes(query) ||
          item.area.toLowerCase().includes(query) ||
          item.feedback.toLowerCase().includes(query)
        )
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="relative max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Submitted Feedback</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border-b">Area</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Name</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Feedback</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((feedback) => (
              <tr key={feedback._id}>
                <td className="py-2 px-4 border-b">{feedback.area}</td>
                <td className="py-2 px-4 border-b">{feedback.name}</td>
                <td className="py-2 px-4 border-b">{feedback.feedback}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
