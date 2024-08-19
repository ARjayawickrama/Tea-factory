import React, { useState, useEffect } from 'react';

export default function Request_alerts() {
  const [technicianRequests, setTechnicianRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5004/TechnicianRequest')
      .then(response => response.json())
      .then(data => setTechnicianRequests(data))
      .catch(error => console.error('Error fetching technician requests:', error));
  }, []);

  const handleConfirm = (id) => {
    // Handle the confirm action (e.g., send a request to the server)
    console.log(`Confirmed request with ID: ${id}`);
  };

  const handleNotConfirm = (id) => {
    // Handle the not confirm action (e.g., send a request to the server)
    console.log(`Not confirmed request with ID: ${id}`);
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl">
        <h2 className="text-center text-teal-500 text-lg font-medium mb-4">Technician Requests</h2>
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
        onClick={handleConfirm}
        className="bg-teal-500 text-white px-4 py-2 rounded shadow hover:bg-teal-600"
      >
        Confirm
      </button>
                  <button
                    onClick={() => handleNotConfirm(request._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                  >
                    Not Confirm
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No technician requests found.</p>
        )}
      </div>
    </div>
  );
}
