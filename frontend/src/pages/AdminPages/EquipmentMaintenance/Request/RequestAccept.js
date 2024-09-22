import React, { useState, useEffect } from 'react';
import AddMaintenanceMember from "../AddMaintenanceMember";
import axios from 'axios';

export default function Request_alerts() {
  const [technicianRequests, setTechnicianRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5004/TechnicianRequest')
      .then(response => response.json())
      .then(data => setTechnicianRequests(data))
      .catch(error => console.error('Error fetching technician requests:', error));
  }, []);

  const handleConfirm = (request) => {
    setSelectedRequest(request);
    setShowForm(true);
  };

  const handleNotConfirm = (id) => {
    console.log(`Not confirmed request with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/TechnicianRequest/${id}`);
      setTechnicianRequests(technicianRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error deleting technician request:', error);
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setSelectedRequest(null);
  };

  return (
    <div>
  <div className="flex flex-col items-center bg-green-600 p-4 rounded-xl w-96 mx-auto  mt-28">
        <h2 className="text-center text-white text-lg font-medium mb-4">Technician Requests</h2>
        {technicianRequests.length > 0 ? (
          <ul className="w-full">
            {technicianRequests.map((request) => (
              <li key={request._id} className="border p-4 mb-2 rounded bg-white shadow">
                <div><strong>Number of Technicians:</strong> {request.numberOfTechnicians}</div>
                <div><strong>Area:</strong> {request.area}</div>
                <div><strong>Employment Type:</strong> {request.employmentType}</div>
                <div><strong>Note:</strong> {request.note}</div>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleConfirm(request)}
                    className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600"
                  >
                     Confirm
                  </button>
               
                  <button
                    onClick={() => handleDelete(request._id)}
                   className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                  >
                     Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No technician requests found.</p>
        )}
        
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-80">
              <button 
                onClick={closeModal} 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
              <AddMaintenanceMember isFormEnabled={true} request={selectedRequest} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
