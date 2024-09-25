import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMaintenanceMember from "./AddMaintenanceMember";
import { MdDelete, MdEditDocument, MdAddBox } from "react-icons/md";
import ConfirmationModalDelete from "../../../components/Alert/ConfirmationModalDelete";
import ConfirmationModalUpdate from "../../../components/Alert/ConfirmationModalUpdate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation

export default function ShowMaintenanceMembers() {
  const [maintaininMembers, setMaintaininMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const fetchMaintaininMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/MaintaininMember"
      );
      setMaintaininMembers(response.data.maintaininMembers);
      setFilteredMembers(response.data.maintaininMembers); // Initialize filtered members
    } catch (error) {
      console.error("Failed to fetch maintainin members:", error);
    }
  };

  useEffect(() => {
    fetchMaintaininMembers();
    const interval = setInterval(fetchMaintaininMembers, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to filter members based on search term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = maintaininMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(value) ||
        member.area.toLowerCase().includes(value)
    );
    setFilteredMembers(filtered);
  };

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Maintenance Members", 20, 20);

    // Set table headers
    doc.setFontSize(10);
    doc.text("Name", 20, 30);
    doc.text("Area", 60, 30);
    doc.text("Phone Number", 100, 30);
    doc.text("Email", 140, 30);
    doc.text("Repair Machine Type", 180, 30);

    // Set table data
    filteredMembers.forEach((member, index) => {
      const y = 40 + index * 10; // Adjust the vertical position for each row
      doc.text(member.name, 20, y);
      doc.text(member.area, 60, y);
      doc.text(member.phone_number, 100, y);
      doc.text(member.email, 140, y);
      doc.text(member.type, 180, y);
    });

    doc.save("maintenance_members.pdf"); // Save the PDF
  };

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
    <div className="container mx-auto p-4">
      <div className="bg-green-800 text-white p-4 rounded-lg mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Our Members</h2>
        </div>

        <div className="flex items-center">
          <button
            onClick={downloadPDF}
            className="bg-yellow-600 text-white px-4 py-2 rounded mr-2"
          >
            Download PDF
          </button>
          <input
            type="text"
            placeholder="Search by Name or Area"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded-md p-2"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-96 rounded-lg shadow-md bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Area</th>
              <th className="p-3 border text-center">Phone Number</th>
              <th className="p-3 border text-center">Email Address</th>
              <th className="p-3 border text-center">Repair Machine Type</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member._id} className="hover:bg-gray-100">
                <td className="p-3 border text-center">{member.name}</td>
                <td className="p-3 border text-center">{member.area}</td>
                <td className="p-3 border text-center">
                  {member.phone_number}
                </td>
                <td className="p-3 border text-center">{member.email}</td>
                <td className="p-3 border text-center">{member.type}</td>
                <td className="p-3 border text-center">
                  <button onClick={() => handleUpdateClick(member)}>
                    <MdEditDocument className="w-7 h-7 text-yellow-600 hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="ml-2"
                  >
                    <MdDelete className="w-7 h-7 text-red-500 hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => setIsAdding(true)} className="ml-2">
                    <MdAddBox className="w-7 h-7 text-green-600 hover:scale-110 transition-transform" />
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
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg mb-4 font-bold">
              Update Maintenance Member
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block">Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block">Repair Machine Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="border rounded-md w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update Member
              </button>
              <button
                type="button"
                onClick={() => setIsUpdating(false)}
                className="ml-2 bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isAdding && <AddMaintenanceMember onClose={() => setIsAdding(false)} />}
      <ToastContainer />
    </div>
  );
}
