import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMaintenanceMember from "./AddMaintenanceMember";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const fetchMaintaininMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5004/MaintaininMember"
      );
      setMaintaininMembers(response.data.maintaininMembers);
      setFilteredMembers(response.data.maintaininMembers);
    } catch (error) {
      console.error("Failed to fetch maintainin members:", error);
    }
  };

  useEffect(() => {
    fetchMaintaininMembers();
    const interval = setInterval(fetchMaintaininMembers, 10000);
    return () => clearInterval(interval);
  }, []);

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

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Table columns for Maintenance Members
    const tableColumn = [
      "Name",
      "Area",
      "Phone Number",
      "Email",
      "Repair Machine Type",
    ];

    // Rows for the table from filteredMembers data
    const tableRows = [];
    filteredMembers.forEach((member) => {
      const rowData = [
        member.name,
        member.area,
        member.phone_number,
        member.email,
        member.type,
      ];
      tableRows.push(rowData);
    });

    const imageUrl = `${window.location.origin}/PdfImage.png`;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      const imgWidth = pdfWidth * 0.9;
      const imgHeight = (img.height * imgWidth) / img.width;

      doc.addImage(
        img,
        "PNG",
        (pdfWidth - imgWidth) / 2,
        10,
        imgWidth,
        imgHeight
      );

      const title = "Maintenance Members";
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const titleWidth = doc.getTextWidth(title);
      doc.text(title, (pdfWidth - titleWidth) / 2, imgHeight + 20);

      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const dateString = now.toLocaleDateString();
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${dateString}  Time: ${timeString}`, 10, imgHeight + 35);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: imgHeight + 40,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [35, 197, 94],
          textColor: [255, 255, 255],
        },
        bodyStyles: {
          fillColor: [240, 240, 240],
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255],
        },
      });

      doc.save("maintenance_members.pdf");
    };

    img.onerror = () => {
      console.error("Failed to load image.");
    };
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

    // Real-time validation
    let newErrors = { ...errors };

    if (name === "name") {
      if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
        newErrors.name =
          "Name must start with a capital letter and contain no numbers.";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "area") {
      if (value.trim() === "") {
        newErrors.area = "Area cannot be empty.";
      } else {
        delete newErrors.area;
      }
    }

    if (name === "phone_number") {
      if (!/^0\d{9}$/.test(value)) {
        newErrors.phone_number =
          "Phone number must start with 0 and be 10 digits long.";
      } else {
        delete newErrors.phone_number;
      }
    }

    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email address is invalid.";
      } else {
        delete newErrors.email;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      if (isUpdating) {
        setConfirmType("update");
      } else {
        setConfirmType("add");
      }
      setIsConfirming(true);
    } else {
      toast.error("Please fix the errors before submitting.");
    }
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
      setIsUpdating(false);
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
      <ToastContainer />

      <div className="flex items-center">
        <div className="bg-green-700 text-white px-4 py-2 rounded mr-2">
          All Technician
        </div>
        <button
          onClick={downloadPDF}
          className="bg-sky-400 text-white px-4 py-2 rounded mr-2"
        >
          Download PDF
        </button>
        <input
          type="text"
          placeholder="Search by Name or Area"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 bg-slate-50"
        />
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
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleUpdateClick(member)}
                  >
                    <MdEditDocument size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:underline ml-2"
                    onClick={() => handleDelete(member._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Member Dialog */}
      <Dialog
        open={isAdding || isUpdating}
        onClose={() => setIsAdding(false) || setIsUpdating(false)}
      >
        <DialogTitle>{isAdding ? "Add Member" : "Update Member"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            name="area"
            label="Area"
            type="text"
            fullWidth
            value={formData.area}
            onChange={handleChange}
            error={!!errors.area}
            helperText={errors.area}
          />
          <TextField
            margin="dense"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            value={formData.phone_number}
            onChange={handleChange}
            error={!!errors.phone_number}
            helperText={errors.phone_number}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="repair-machine-type-label">
              Repair Machine Type
            </InputLabel>
            <Select
              margin="dense"
              name="type"
              label="Repair Machine Type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              error={!!errors.type}
            >
              <MenuItem value="Electrical Technician">Electrical Technician</MenuItem>
              <MenuItem value="Mechanical Technician">Mechanical Technician</MenuItem>
              <MenuItem value="Electronics Technician">Electronics Technician</MenuItem>
            </Select>
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAdding(false) || setIsUpdating(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{isAdding ? "Add" : "Update"}</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirming} onClose={() => setIsConfirming(false)}>
        <DialogTitle>
          {confirmType === "delete" ? "Confirm Deletion" : "Confirm Update"}
        </DialogTitle>
        <DialogContent>
          {confirmType === "delete" ? (
            <p>Are you sure you want to delete this member?</p>
          ) : (
            <p>Are you sure you want to update this member?</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirming(false)}>Cancel</Button>
          <Button
            onClick={confirmType === "delete" ? confirmDelete : confirmUpdate}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
