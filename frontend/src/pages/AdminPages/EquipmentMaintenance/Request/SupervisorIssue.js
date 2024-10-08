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
        const response = await axios.get('http://localhost:5004/EQIsus');
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
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5004/EQIsus/${id}`);
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
          item.date.toLowerCase().includes(query) ||
          item.note.toLowerCase().includes(query)
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
        <h2 className="text-xl font-semibold mb-4"> Feedback</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2  bord rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <table className="w-full bg-slate-50">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border-b">name</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Date</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Feedback</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((feedback) => (
              <tr key={feedback._id}>
                <td className="py-2 px-4 border-b">{feedback.name}</td>
                <td className="py-2 px-4 border-b">{feedback.date}</td>
                <td className="py-2 px-4 border-b">{feedback.note}</td>
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
