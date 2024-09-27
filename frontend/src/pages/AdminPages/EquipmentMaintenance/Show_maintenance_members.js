import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMaintenanceMember from "./AddMaintenanceMember";
import { MdDelete, MdEditDocument, MdAddBox } from "react-icons/md";
import ConfirmationModalDelete from "../../../components/Alert/ConfirmationModalDelete";
import ConfirmationModalUpdate from "../../../components/Alert/ConfirmationModalUpdate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowMaintenanceMembers() {
  const [maintaininMembers, setMaintaininMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmType, setConfirmType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    phone_number: "",
    email: "",
    type: "",
  });

  const fetchMaintaininMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5004/MaintaininMember");
      setMaintaininMembers(response.data.maintaininMembers);
    } catch (error) {
      console.error("Failed to fetch maintainin members:", error);
    }
  };

  useEffect(() => {
    fetchMaintaininMembers();
    const interval = setInterval(fetchMaintaininMembers, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmType("delete");
    setIsConfirming(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5004/MaintaininMember/${deleteId}`);
      setMaintaininMembers(
        maintaininMembers.filter((member) => member._id !== deleteId)
      );
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("Failed to delete maintainin member:", error);
      toast.error("Failed to delete member");
    } finally {
      setIsConfirming(false);
      setDeleteId(null);
    }
  };

  const handleUpdateClick = (member) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      area: member.area,
      phone_number: member.phone_number,
      email: member.email,
      type: member.type,
    });
    setIsUpdating(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmType("update");
    setIsConfirming(true);
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5004/MaintaininMember/${currentMember._id}`,
        formData
      );
      setMaintaininMembers(
        maintaininMembers.map((member) =>
          member._id === currentMember._id ? { ...member, ...formData } : member
        )
      );
      toast.success("Member updated successfully");
    } catch (error) {
      console.error("Failed to update maintainin member:", error);
      toast.error("Failed to update member");
    } finally {
      setIsUpdating(false); // Close the form
      setIsConfirming(false);
      setCurrentMember(null);
      setFormData({
        name: "",
        area: "",
        phone_number: "",
        email: "",
        type: "",
      });
    }
  };

  return (
    <div>
      <div className="col-span-3 flex flex-col bg-green-800 text-white w-full p-1">
        <div className="text-center text-lg mb-9">Our Maintain Members</div>
      </div>

      <div className="col-span-3 flex flex-col overflow-y-auto max-h-96 relative bottom-6">
        <table className="w-full bg-white text-black">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Area</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">Email Address</th>
              <th className="p-2 border">Repair Machine Type</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {maintaininMembers.map((member) => (
              <tr key={member._id}>
                <td className="p-2 border">{member.name}</td>
                <td className="p-2 border">{member.area}</td>
                <td className="p-2 border">{member.phone_number}</td>
                <td className="p-2 border">{member.email}</td>
                <td className="p-2 border">{member.type}</td>
                <td className="p-2 border">
                  <button onClick={() => handleUpdateClick(member)}>
                    <MdEditDocument className="w-9 h-8 text-yellow-600" />
                  </button>
                  <button onClick={() => handleDelete(member._id)}>
                    <MdDelete className="w-9 h-8 text-red-500" />
                  </button>
                  <button onClick={() => setIsAdding(true)}>
                    <MdAddBox className="w-9 h-8 text-green-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isConfirming && confirmType === "delete" && (
        <ConfirmationModalDelete
          onConfirm={confirmDelete}
          onCancel={() => setIsConfirming(false)}
        />
      )}

      {isConfirming && confirmType === "update" && (
        <ConfirmationModalUpdate
          onConfirm={confirmUpdate}
          onCancel={() => setIsConfirming(false)}
        />
      )}

      {isUpdating && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-l-3xl rounded-r-3xl w-96 shadow-lg">
            <h2 className="text-lg mb-4 ml-9">Update Maintainin Member</h2>
            <form onSubmit={handleSubmit} className="ml-9">
              <div>
                <label className="block">Name:</label>
                <input
                  className="border rounded-md w-64"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block">Area:</label>
                <input
                  className="border rounded-md w-64"
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block">Phone Number:</label>
                <input
                  className="border rounded-md w-64"
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block">Email:</label>
                <input
                  className="border rounded-md w-64"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block">Type:</label>
                <input
                  className="border rounded-md w-64"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-600 w-64 text-white px-4 py-2 mt-2 rounded"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => setIsUpdating(false)}
                className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-l-3xl rounded-r-3xl w-96 shadow-lg">
            <AddMaintenanceMember />
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
