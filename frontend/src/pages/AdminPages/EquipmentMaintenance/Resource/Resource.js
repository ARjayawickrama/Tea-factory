import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { MdEditDocument, MdDelete } from "react-icons/md";

const ResourcePage = () => {
  const [validationErrors, setValidationErrors] = useState({});
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
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    // Clear validation error for this field
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // If machineID is being changed, validate it in real-time
    if (name === "machineID") {
      if (value && !isValidMachineId(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          machineID: "Invalid Machine ID format (M-[A/B/C/D]-XXXX).",
        }));
      }
    }
  };
  // Handle file input changes
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
    const regex = /^M-[ADK]-[PWCFSP]-\d{4}$/;
    return regex.test(machineId);
  };

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

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full   bg-stone-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-40" : "w-8"
        }`}
      >
        <nav>
          <ul className="">
            <li className="p-2 cursor-pointer flex items-center h-24 bg-amber-500">
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
          {isSidebarOpen ? "" : "Show"}
        </button>
      </div>

      <main
        className={`flex-1 p-6 transition-transform duration-300 bg-slate-50 ${
          isSidebarOpen ? "ml-40" : "ml-8"
        }`}
      >
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Resource
        </button>
        <div className="bg-green-800 text-white p-4 rounded-lg mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">All Machins</h2>
          </div>

          <div className="flex items-center text-black">
            <input
              type="text"
              placeholder="Search by Name or Area"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md p-2"
            />
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white shadow-2xl  p-6 rounded  w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editResource ? "Edit Resource" : "Add Resource"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="machineName"
                  value={formState.machineName}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select Machine Name</option>
                  <option value="Tea Leaf Plucker">Tea Leaf Plucker</option>
                  <option value="Withering Unit">Withering Unit</option>
                  <option value="Cutter and Shredder">
                    Cutter and Shredder
                  </option>
                  <option value="Fermentation Tank">Fermentation Tank</option>
                  <option value="Sorting and Grading Machine">
                    Sorting and Grading Machine
                  </option>
                  <option value="Packing and Sealing Machine">
                    Packing and Sealing Machine
                  </option>
                  <option value="Blending Mixer">Blending Mixer</option>
                </select>

                <input
                  type="text"
                  name="machineID"
                  maxLength={10}
                  value={formState.machineID}
                  onChange={handleChange}
                  placeholder="Machine ID (Optional)"
                  className="w-full border rounded px-2 py-1"
                  disabled={editResource !== null}
                />

                {validationErrors.machineID && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.machineID}
                  </span>
                )}
                <select
                  name="Area"
                  value={formState.Area}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select Area</option>
                  <option value="Akurassa">Akurassa</option>
                  <option value="Deniyaya">Deniyaya</option>
                </select>

                <label className="block mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div key={resource._id} className="bg-white p-4 rounded shadow-2xl ">
              <img
                src={`http://localhost:5004/images/${resource.image
                  .split("\\")
                  .pop()}`}
                alt={resource.machineName}
                className="w-72 h-56 object-cover mx-auto "
              />
              <h3 className="text-lg font-semibold  mt-6">
                {resource.machineName}
              </h3>
              <p className="text-red-700 text-xl">
                Machine ID: {resource.machineID}
              </p>
              <p className="text-gray-700 text-xl">Area: {resource.Area}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(resource)}
                  className="text-blue-500"
                >
                  <MdEditDocument className="inline-block mr-1 w-10 h-10" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(resource._id)}
                  className="text-red-500"
                >
                  <MdDelete className="inline-block mr-1 w-10 h-10" />
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
