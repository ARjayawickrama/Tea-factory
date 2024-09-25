import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";

const ResourcePage = () => {
  const [resources, setResources] = useState([]); // State for resources
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [editResource, setEditResource] = useState(null); // State for editing resource
  const [formState, setFormState] = useState({ // State for form inputs
    machineName: "",
    machineID: "",
    image: "",
    Area: "",
    isEnabled: true,
  });
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch resources on component mount
  useEffect(() => {
    fetchResources();
  }, []);

  // Function to fetch resources from the backend
  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:5004/Resource");
      setResources(response.data.resources); // Set resources from response
    } catch (error) {
      console.error(error); // Log error
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  // Filter resources based on search term
  const filteredResources = resources.filter(
    (resource) =>
      resource.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.machineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.Area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value })); // Update form state
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormState((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file), // Create object URL for preview
      }));
    }
  };

  // Validate machine ID format
  const isValidMachineId = (machineId) => {
    const regex = /^M-[ABCD]-\d{4}$/; // Regular expression for validation
    return regex.test(machineId);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate machine ID
    if (!isValidMachineId(formState.machineID)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Machine ID",
        text: "Machine ID must follow the format M-[A/B/C/D]-XXXX.",
      });
      return;
    }

    // Check for duplicate Machine ID
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
        formData.append("image", imageFile); // Append image file if exists
      }

      if (editResource) {
        await axios.put(
          `http://localhost:5004/Resource/${editResource._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // Update the resources state with the edited resource
        setResources(
          resources.map((resource) =>
            resource._id === editResource._id
              ? { ...formState, image: URL.createObjectURL(imageFile) }
              : resource
          )
        );
        setEditResource(null); // Reset edit resource state
      } else {
        const response = await axios.post(
          "http://localhost:5004/Resource",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setResources([...resources, response.data.newResource]); // Add new resource to state
      }
      // Reset form state
      setFormState({
        machineName: "",
        machineID: "",
        image: "",
        Area: "",
        isEnabled: true,
      });
      setImageFile(null); // Reset image file
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error(error); // Log error
    }
  };

  // Handle edit button click
  const handleEdit = (resource) => {
    setEditResource(resource); // Set resource to edit
    setFormState(resource); // Populate form with resource data
    if (resource.image) {
      setImageFile(null); // Reset image file if exists
    }
    setIsModalOpen(true); // Open modal
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/Resource/${id}`); // Delete resource from backend
      setResources(resources.filter((resource) => resource._id !== id)); // Remove resource from state
    } catch (error) {
      console.error(error); // Log error
    }
  };

  // Open modal for adding a new resource
  const openModal = () => {
    setEditResource(null); // Reset edit resource
    setFormState({
      machineName: "",
      machineID: "",
      image: "",
      Area: "",
      isEnabled: true,
    });
    setImageFile(null); // Reset image file
    setIsModalOpen(true); // Open modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false); // Close modal
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
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
          className="absolute top-0 right-0 mt-4 mr-4 text-white"
        >
          {isSidebarOpen ? "Hide" : "Show"}
        </button>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 ${
          isSidebarOpen ? "ml-40" : "ml-8"
        }`}
      >
        <button
          onClick={openModal} // Open modal for adding resource
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Resource
        </button>
        <div className="bg-green-800 text-white p-4 rounded-lg mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Our Members</h2>
          </div>

          <div className="flex items-center">
            <button
              // Uncomment and implement downloadPDF function as needed
              // onClick={downloadPDF}
              className="bg-yellow-600 text-white px-4 py-2 rounded mr-2"
            >
              Download PDF
            </button>
            <input
              type="text"
              placeholder="Search by Name or Area"
              value={searchTerm}
              onChange={handleSearchChange} // Call search change handler
              className="border rounded-md p-2"
            />
          </div>
        </div>

        {isModalOpen && ( // Modal for adding/editing resources
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
                  onChange={handleChange} // Call input change handler
                  placeholder="Machine Name"
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  name="machineID"
                  value={formState.machineID}
                  onChange={handleChange} // Call input change handler
                  placeholder="Machine ID"
                  className="w-full border rounded px-2 py-1"
                  disabled={editResource !== null} // Disable if editing an existing resource
                />
                <input
                  type="text"
                  name="Area"
                  value={formState.Area}
                  onChange={handleChange} // Call input change handler
                  placeholder="Area"
                  className="w-full border rounded px-2 py-1"
                />
                 <label className="block mb-1">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} // Handle file change
                    className="border p-2 w-full"
                  />
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded"
                >
                  {editResource ? "Update Resource" : "Add Resource"}
                </button>
                <button
                  type="button"
                  onClick={closeModal} // Call close modal handler
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => ( // Map through filtered resources
            <div key={resource._id} className="bg-white p-4 rounded shadow">
               <img
                    src={`http://localhost:5004/images/${resource.image
                      .split("\\")
                      .pop()}`}
                    alt={resource.machineName}
                    className="w-72 h-56 object-cover mx-auto"
                  />
              <h3 className="text-lg font-semibold">{resource.machineName}</h3>
              <p className="text-gray-700">Machine ID: {resource.machineID}</p>
              <p className="text-gray-700">Area: {resource.Area}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(resource)} // Call edit handler
                  className="text-blue-500"
                >
                  <MdEditDocument className="inline-block mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resource._id)} // Call delete handler
                  className="text-red-500"
                >
                  <MdDelete className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResourcePage;
