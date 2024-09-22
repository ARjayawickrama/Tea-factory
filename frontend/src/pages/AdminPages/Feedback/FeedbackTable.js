import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    const cachedFeedbacks = localStorage.getItem("feedbacks");
    if (cachedFeedbacks) {
      setFeedbacks(JSON.parse(cachedFeedbacks));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5004/FeedBacks");
      setFeedbacks(response.data);
      localStorage.setItem("feedbacks", JSON.stringify(response.data)); // Cache the data
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/FeedBacks/${id}`);
      fetchFeedbacks(); // Refresh the table after deletion
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleUpdate = (feedback) => {
    setSelectedFeedback(feedback);
    setFormData(feedback); // Set form data to the selected feedback
    setModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedFeedback(null);
    setFormData({ name: "", email: "", review: "", rating: "", image: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5004/FeedBacks/${selectedFeedback._id}`,
        formData
      );
      fetchFeedbacks();
      handleModalClose();
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Feedbacks", 14, 16);

    const pdfData = feedbacks.map((feedback) => [
      feedback.name,
      feedback.email,
      feedback.review,
      feedback.rating,
      feedback.image ? `/${feedback.image}` : "No Image",
    ]);

    autoTable(doc, {
      head: [["Name", "Email", "Review", "Rating", "Image"]],
      body: pdfData,
      startY: 20,
    });

    doc.save("feedbacks.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className=" relative right-96 mr-56 top-12 ">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-800 text-white py-8 px-4 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
      <div className="overflow-x-auto relative left-56 top-48">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Review</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="py-2 px-4 border-b">{feedback.name}</td>
                <td className="py-2 px-4 border-b">{feedback.email}</td>
                <td className="py-2 px-4 border-b">{feedback.review}</td>
                <td className="py-2 px-4 border-b">{feedback.rating}</td>
                <td className="py-2 px-4 border-b">
                  {feedback.image && (
                    <img
                      src={`/${feedback.image}`}
                      alt="Feedback"
                      className="w-20 h-20"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdate(feedback)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(feedback._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Update Feedback</h2>
            <form onSubmit={handleSubmit} className="w-96 left-20">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Review</label>
                <textarea
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Rating</label>
                <input
                  type="number"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="border rounded w-full px-3 py-2"
                  min="1"
                  max="5"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-2 bg-gray-300 text-black py-1 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
