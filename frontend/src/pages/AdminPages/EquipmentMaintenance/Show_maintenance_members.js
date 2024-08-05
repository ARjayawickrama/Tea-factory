import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMaintenanceMember from './AddMaintenanceMember'; // Adjust the import path as needed

export default function ShowMaintenanceMembers() {
  const [maintaininMembers, setMaintaininMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State to manage the Add form visibility
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    phone_number: '',
    email: '',
    type: ''
  });

  useEffect(() => {

    const fetchMaintaininMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5004/MaintaininMember');
        setMaintaininMembers(response.data.maintaininMembers);
      } catch (error) {
        console.error('Failed to fetch maintainin members:', error);
      }
    };

    fetchMaintaininMembers();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/MaintaininMember/${id}`);
    
      setMaintaininMembers(maintaininMembers.filter(member => member._id !== id));
    } catch (error) {
      console.error('Failed to delete maintainin member:', error);
    }
  };

  const handleUpdateClick = (member) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      area: member.area,
      phone_number: member.phone_number,
      email: member.email,
      type: member.type
    });
    setIsUpdating(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5004/MaintaininMember/${currentMember._id}`, formData);

      setMaintaininMembers(maintaininMembers.map(member =>
        member._id === currentMember._id ? { ...member, ...formData } : member
      ));
      setIsUpdating(false);
      setCurrentMember(null);
    } catch (error) {
      console.error('Failed to update maintainin member:', error);
    }
  };

  return (
    <div>
      <div className="col-span-3 flex flex-col bg-black text-white w-full p-1">
        <div className="text-center text-lg mb-9">Our Maintain Members</div>
      </div>
      <div className="col-span-3 flex flex-col overflow-y-auto max-h-96 relative bottom-6">
        <table className="w-full bg-white text-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Area</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Email Address</th>
              <th className="p-2 border">Repair Machine Type</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {maintaininMembers.map(member => (
              <tr key={member._id}>
                <td className="p-2 border">{member.name}</td>
                <td className="p-2 border">{member.area}</td>
                <td className="p-2 border">{member.phone_number}</td>
                <td className="p-2 border">{member.email}</td>
                <td className="p-2 border">{member.type}</td>
                <td className="p-2 border">
                  <button 
                    className="bg-blue-400 text-white px-2 py-1 m-1" 
                    onClick={() => handleUpdateClick(member)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 m-1" 
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-green-500 text-white px-2 py-1 m-1" 
                    onClick={() => setIsAdding(true)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUpdating && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg mb-4">Update Maintainin Member</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Area:</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Type:</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="bg-blue-400 text-white px-4 py-2 mt-2">Update</button>
              <button 
                type="button" 
                onClick={() => setIsUpdating(false)} 
                className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <AddMaintenanceMember />
            <button 
              type="button" 
              onClick={() => setIsAdding(false)} 
              className="bg-gray-500 text-white px-4 py-2 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
