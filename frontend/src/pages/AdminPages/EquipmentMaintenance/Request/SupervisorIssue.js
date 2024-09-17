import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function SupervisorIssue({ onDelete }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://localhost:5004/EqFeedback');
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError('Failed to load feedback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

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
            {feedbackData.map((feedback, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{feedback.area}</td>
                <td className="py-2 px-4 border-b">{feedback.name}</td>
                <td className="py-2 px-4 border-b">{feedback.feedback}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onDelete(index)}
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
