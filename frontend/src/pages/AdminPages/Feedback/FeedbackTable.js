import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editableFeedback, setEditableFeedback] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    rating: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5004/feedbacks");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const handleEdit = (feedback) => {
    setEditableFeedback(feedback);
    setFormData({
      name: feedback.name,
      email: feedback.email,
      review: feedback.review,
      rating: feedback.rating,
      image: feedback.image,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5004/feedbacks/${editableFeedback._id}`,
        formData
      );
      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback._id === editableFeedback._id ? formData : feedback
        )
      );
      setEditableFeedback(null);
      setFormData({ name: "", email: "", review: "", rating: "", image: "" });
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "Email", "Review", "Rating", "Image"];
    const tableRows = [];

    // Add feedback data to the PDF table
    feedbacks.forEach((feedback) => {
      const feedbackData = [
        feedback.name,
        feedback.email,
        feedback.review,
        feedback.rating,
        Array.isArray(feedback.image)
          ? feedback.image.join(", ")
          : feedback.image || "No image",
      ];
      tableRows.push(feedbackData);
    });

    // Load the image from the public folder
    const imageUrl = `${window.location.origin}/PdfImage.png`; // Path to the image in the public folder
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth();
      const imgWidth = pdfWidth - 28;
      const imgHeight = (img.height * imgWidth) / img.width;

      doc.addImage(img, "PNG", 0, 0, 210, 60);

      const title = "Feedback Report";
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pdfWidth - titleWidth) / 2;

      doc.setFont("helvetica", "bold");
      doc.text(title, titleX, 70);

      doc.setFont("helvetica", "normal");

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30 + imgHeight,
        theme: "grid",
        headStyles: {
          fillColor: [35, 197, 94],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [240, 240, 240],
          textColor: [0, 0, 0],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
      });

      doc.save("feedback_report.pdf");
    };
  };

  // Filter feedback based on search term
  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border border-gray-300 p-4 rounded-lg relative right-28">
      <h2 className="text-xl font-bold mb-2">Feedback Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />

      <button
        onClick={exportToPDF}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Download PDF Report
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Review</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>{" "}
            {/* New column for Image */}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.length > 0 ? (
            filteredFeedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.review}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.rating}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.image && (
                    <img
                      src={feedback.image}
                      alt="Feedback"
                      className="w-16 h-16 object-cover"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(feedback)}
                    sx={{ color: "#4379F2" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(feedback._id)}
                    sx={{ color: "#C7253E" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No feedback available.
              </td>
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <textarea
            value={formData.review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
            placeholder="Review"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <input
            type="number"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            placeholder="Rating"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="Image URL"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Update Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
