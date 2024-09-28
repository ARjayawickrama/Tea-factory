import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editableFeedback, setEditableFeedback] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', review: '', rating: '', image: '' });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5004/feedbacks');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
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
      await axios.put(`http://localhost:5004/feedbacks/${editableFeedback._id}`, formData);
      setFeedbacks(feedbacks.map(feedback => (feedback._id === editableFeedback._id ? formData : feedback)));
      setEditableFeedback(null);
      setFormData({ name: '', email: '', review: '', rating: '', image: '' });
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Name', 'Email', 'Review', 'Rating', 'Image'];
    const tableRows = [];
  
    // Add feedback data to the PDF table
    feedbacks.forEach(feedback => {
      const feedbackData = [
        feedback.name,
        feedback.email,
        feedback.review,
        feedback.rating,
        Array.isArray(feedback.image) ? feedback.image.join(', ') : feedback.image || 'No image' // Handle undefined or non-array image
      ];
      tableRows.push(feedbackData);
    });
  
    // Load the image from the public folder
    const imageUrl = `${window.location.origin}/PdfImage.png`; // Path to the image in the public folder
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth(); // Get the PDF width
      const imgWidth = pdfWidth - 28; // 14 on each side for margins
      const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
  
      doc.addImage(img, 'PNG', 0, 0, 210, 60); // Add image to PDF (x, y, width, height)
  
      // Center the title
      const title = 'Feedback Report';
      const titleWidth = doc.getTextWidth(title);
      const titleX = (pdfWidth - titleWidth) / 2; // Calculate X position for center alignment
  
      // Set font to bold and add the title
      doc.setFont("helvetica", "bold");
      doc.text(title, titleX, 70); // Position title below the image
  
      // Set font back to normal for the table
      doc.setFont("helvetica", "normal");
  
      // Generate table with custom colors
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30 + imgHeight, // Start the table after the image and title
        theme: 'grid',
        headStyles: {
          fillColor: [35, 197, 94], // Change header background color
          textColor: [255, 255, 255], // Change header text color (white)
          fontStyle: 'bold', // Make header text bold
        },
        bodyStyles: {
          fillColor: [240, 240, 240], // Change body background color (light gray)
          textColor: [0, 0, 0], // Change body text color (black)
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255], // Alternate row color (white)
        },
      });
  
      doc.save('feedback_report.pdf'); // Save and download the PDF
    };
  };
  

  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Feedback Table</h2>
      <button onClick={exportToPDF} className="bg-red-500 text-white p-2 rounded mb-4">
        Download PDF Report
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Review</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Image</th> {/* New column for Image */}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map(feedback => (
              <tr key={feedback._id}>
                <td className="border border-gray-300 px-4 py-2">{feedback.name}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.email}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.review}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.rating}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {feedback.image && <img src={feedback.image} alt="Feedback" className="w-16 h-16 object-cover" />} {/* Display image */}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <IconButton aria-label="edit" onClick={() => handleEdit(feedback)} sx={{ color: '#4379F2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(feedback._id)} sx={{ color: '#C7253E' }}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No feedback available.</td> {/* Adjusted colspan */}
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
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Image URL"
            className="border border-gray-300 p-2 rounded mb-2 w-full"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">
            Update Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
