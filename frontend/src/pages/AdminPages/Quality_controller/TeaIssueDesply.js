import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QulatiIsusInfrom from './QulatiIsusInfrom';

const TeaIssueForm = () => {
  const [teaIssues, setTeaIssues] = useState([]);

  // Function to fetch tea issues from the API
  const fetchTeaIssues = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/QulatiIsusInfrom');
      setTeaIssues(response.data);
    } catch (error) {
      console.error('Error fetching tea issues:', error);
    }
  };

  // Fetch tea issues when the component mounts
  useEffect(() => {
    fetchTeaIssues();
  }, []);

  // Function to handle deletion of a tea issue
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/api/QulatiIsusInfrom/${id}`);
      fetchTeaIssues(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting tea issue:', error);
    }
  };

  // Function to handle refresh after adding a new issue
  const handleRefresh = () => {
    fetchTeaIssues(); // Refresh the list after adding a new issue
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tea Issue Management</h1>
      <QulatiIsusInfrom onSubmitSuccess={handleRefresh} />
      
      <h2 className="text-xl font-semibold mb-2">Existing Tea Issues</h2>
      <ul>
        {teaIssues.map((issue) => (
          <li key={issue._id} className="flex justify-between items-center mb-2">
            <div>
              <strong>{issue.teaType}</strong> ({issue.teaGrade}) - {issue.quantity} on {new Date(issue.date).toLocaleDateString()}
            </div>
            <button onClick={() => handleDelete(issue._id)} className="bg-red-500 text-white py-1 px-3 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeaIssueForm;
