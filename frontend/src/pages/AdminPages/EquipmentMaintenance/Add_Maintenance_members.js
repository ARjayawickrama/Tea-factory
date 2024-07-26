import React from 'react';

export default function AddMaintenanceMembers({ closeForm }) {
  return (
   
     <div className="absolute right-0 mt-4 bg-white rounded-xl shadow-sm w-2/4">
      <div className="relative">
        <h1 className="text-xl font-bold mb-4">Add New Member</h1>
        <form className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="text"
              placeholder="Enter Email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
   
   </div>
  );
}
