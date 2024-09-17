import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';
import { MdEditDocument, MdDelete } from 'react-icons/md'; // Added icons for editing and deleting

const ResourcePage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editResource, setEditResource] = useState(null);
  const [formState, setFormState] = useState({
    machineName: '',
    machineID: '',
    image: '',
    Area: '',
    isEnabled: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:5004/Resource');
      setResources(response.data.resources);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredResources = resources.filter(resource =>
    resource.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.machineID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.Area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormState(prevState => ({ ...prevState, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('machineName', formState.machineName);
      formData.append('machineID', formState.machineID);
      formData.append('Area', formState.Area);
      formData.append('isEnabled', formState.isEnabled);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editResource) {
        await axios.put(`http://localhost:5004/Resource/${editResource._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setResources(resources.map(resource =>
          resource._id === editResource._id ? { ...formState, image: URL.createObjectURL(imageFile) } : resource
        ));
        setEditResource(null);
      } else {
        const response = await axios.post('http://localhost:5004/Resource', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setResources([...resources, response.data.newResource]);
      }
      setFormState({
        machineName: '',
        machineID: '',
        image: '',
        Area: '',
        isEnabled: true
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
      setResources(resources.filter(resource => resource._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setEditResource(null);
    setFormState({
      machineName: '',
      machineID: '',
      image: '',
      Area: '',
      isEnabled: true
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white transition-all duration-300 ${isSidebarOpen ? "w-40" : "w-8"}`}
      >
        <nav>
          <ul className="mt-40">
            <li className="p-2 cursor-pointer flex items-center bg-amber-500">
              <FaUsers className="w-8 h-8" />
              <span className={`ml-1 text-base font-medium ${isSidebarOpen ? "block" : "hidden"}`}>
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
        className={`flex-1 p-6 transition-transform duration-300 ${isSidebarOpen ? "ml-40" : "ml-8"}`}
      >
       

        <button
          onClick={openModal}
          className=" bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Resource
        </button>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border rounded px-2 py-1 "
          />
        </div>

        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editResource ? 'Edit Resource' : 'Add Resource'}
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
                  className=" bg-green-800 text-white px-4 py-2 rounded"
                >
                  {editResource ? 'Update Resource' : 'Add Resource'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className=" bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <table className="w-full bg-white text-black border-collapse">
          <thead>
            <tr className=" bg-green-800 text-white">
              <th className="p-2 border">Machine Name</th>
              <th className="p-2 border">Machine ID</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Area</th>
              <th className="p-2 border w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map(resource => (
              <tr key={resource._id}>
                <td className="p-2 border font-semibold text-base">{resource.machineName}</td>
                <td className="p-2 border font-semibold text-base">{resource.machineID}</td>
                <td className="p-2 border">
                  {resource.image ? (
                    <img
                      src={`http://localhost:5004/uploads/${resource.image}`}
                      alt="Machine"
                      width="100"
                      className="object-cover font-semibold text-base"
                    />
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="p-2 border font-semibold text-base">{resource.Area}</td>
                <td className="p-2 border text-center font-semibold text-base">
                  <button onClick={() => handleEdit(resource)}>
                    <MdEditDocument className="w-10 h-10 text-yellow-600" />
                  </button>
                  <button onClick={() => handleDelete(resource._id)}>
                    <MdDelete className="w-10 h-10 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ResourcePage;
