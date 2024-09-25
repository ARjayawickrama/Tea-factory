import React, { useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

export default function TeaManager() {
  const [form, setForm] = useState({
    typeOfTea: "",
    teaGrade: "",
    flavor: "",
    date: "",
    color: "",
    note: "",
  });
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5004/QualityController", form);
      setForm({
        typeOfTea: "",
        teaGrade: "",
        flavor: "",
        date: "",
        color: "",
        note: "",
      });
    } catch (err) {
      setError("Failed to submit tea entry.");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full bg-stone-800 text-white w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <nav>
          <ul>
            <a
              href="/Quality_supervisor"
              className="p-4 cursor-pointer bg-amber-500 mt-20 flex items-center"
            >
              <FaUsers className="w-8 h-8 mr-4" />
              <span>Quality Supervisor</span>
            </a>
          </ul>
        </nav>
      </div>

      <main
        className={`ml-64 p-4 flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto p-6">
         

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 w-3/4 justify-center items-center rounded-lg shadow-md relative left-36 top-28"
          >
            <div>
              <label className="block text-gray-700">Manufacture Name</label>
              <input
                type="text"
                name="typeOfTea"
                value={form.typeOfTea}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Tea Grade</label>
              <input
                type="text"
                name="teaGrade"
                value={form.teaGrade}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Flavor</label>
              <input
                type="text"
                name="flavor"
                value={form.flavor}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-teal-500 font-semibold rounded-md shadow-md hover:bg-teal-600"
            >
              Add Tea Entry
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
