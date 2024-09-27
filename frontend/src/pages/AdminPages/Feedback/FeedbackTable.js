import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editableFeedback, setEditableFeedback] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', review: '', rating: '' });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5004/feedbacks'); // Ensure the correct URL here
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleEdit = (feedback) => {
    setEditableFeedback(feedback);
    setFormData({ name: feedback.name, email: feedback.email, review: feedback.review, rating: feedback.rating });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5004/feedbacks/${editableFeedback._id}`, formData);
      setFeedbacks(feedbacks.map(feedback => (feedback._id === editableFeedback._id ? formData : feedback)));
      setEditableFeedback(null);
      setFormData({ name: '', email: '', review: '', rating: '' });
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Feedback Table</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Review</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="border border-gray-300 px-4 py-2">{feedback.name}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.email}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.review}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.rating}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleEdit(feedback)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(feedback._id)} className="text-red-500 ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No feedback available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editableFeedback && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Edit Feedback</h3>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            placeholder="Review"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            placeholder="Rating"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update Feedback</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
