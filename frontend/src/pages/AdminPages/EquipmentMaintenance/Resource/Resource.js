import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUsers, FaDownload } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the jsPDF autotable plugin

const ResourcePage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editResource, setEditResource] = useState(null);
  const [formState, setFormState] = useState({
    machineName: "",
    machineID: "",
    image: "",
    Area: "",
    isEnabled: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5004/Resource");
      setResources(response.data.resources);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.machineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.Area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormState((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const isValidMachineId = (machineId) => {
    const regex = /^M-[ABCD]-\d{4}$/;
    return regex.test(machineId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidMachineId(formState.machineID)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must follow the format M-[A/B/C/D]-XXXX.",
      });
      return;
    }

    if (
      resources.some(
        (resource) =>
          resource.machineID === formState.machineID &&
          (!editResource || resource._id !== editResource._id)
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Machine ID",
        text: "This Machine ID is already in use.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("machineName", formState.machineName);
      formData.append("machineID", formState.machineID);
      formData.append("Area", formState.Area);
      formData.append("isEnabled", formState.isEnabled);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editResource) {
        await axios.put(
          `http://localhost:5004/Resource/${editResource._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setResources(
          resources.map((resource) =>
            resource._id === editResource._id
              ? { ...formState, image: URL.createObjectURL(imageFile) }
              : resource
          )
        );
        setEditResource(null);
      } else {
        const response = await axios.post(
          "http://localhost:5004/Resource",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setResources([...resources, response.data.newResource]);
      }
      setFormState({
        machineName: "",
        machineID: "",
        image: "",
        Area: "",
        isEnabled: true,
      });
      setImageFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (resource) => {
    setEditResource(resource);
    setFormState(resource);
    if (resource.image) {
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/Resource/${id}`);
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setEditResource(null);
    setFormState({
      machineName: "",
      machineID: "",
      image: "",
      Area: "",
      isEnabled: true,
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Resource List", 14, 22);

    const headers = ["Machine Name", "Machine ID", "Area"];
    const data = filteredResources.map((resource) => [
      resource.machineName,
      resource.machineID,
      resource.Area,
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      theme: "grid",
    });

    doc.save("resources.pdf");
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-40" : "w-8"
        }`}
      >
        <nav>
          <ul className="mt-40">
            <li className="p-2 cursor-pointer flex items-center bg-amber-500">
              <FaUsers className="w-8 h-8" />
              <span
                className={`ml-1 text-base font-medium ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Equipment
              </span>
            </li>
          </ul>
        </nav>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-0 right-0 mt-4 mr-4 text-white"
        >
          {/* Add button icon here */}
        </button>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-40" : "ml-8"
        }`}
      >
        <div className="flex space-x-4">
           
            <div className="mb-6 p-4 bg-green-600 rounded-md shadow-md w-52">
              <button
                onClick={downloadPDF}
                className="mb-4 text-white p-2 rounded flex items-center"
              >
                <FaDownload className="w-16 h-11 ml-9 relative top-3" />
              </button>
            </div>
            <div className="mb-6 p-4 bg-green-600 rounded-md shadow-md w-52">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  // value={searchQuery}
                  // onChange={handleSearchChange}
                  className="p-2 rounded-md w-full"
                />
              </div>
            </div>
          </div>

        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Resource
        </button>

        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editResource ? "Edit Resource" : "Add Resource"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="machineName"
                  value={formState.machineName}
                  onChange={handleChange}
                  placeholder="Machine Name"
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="machineID"
                  value={formState.machineID}
                  onChange={handleChange}
                  placeholder="Machine ID"
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="Area"
                  value={formState.Area}
                  onChange={handleChange}
                  placeholder="Area"
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full border rounded px-2 py-1"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {editResource ? "Update Resource" : "Add Resource"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Machine Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Machine ID</th>
                <th className="border border-gray-300 px-4 py-2">Area</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource) => (
                <tr key={resource._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {resource.machineName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resource.machineID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {resource.Area}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(resource)}
                      className="text-yellow-500"
                    >
                      <MdEditDocument />
                    </button>
                    <button
                      onClick={() => handleDelete(resource._id)}
                      className="text-red-500"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ResourcePage;
