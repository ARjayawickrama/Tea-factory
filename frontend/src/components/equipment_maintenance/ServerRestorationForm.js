import React from 'react';

export default function ServerRestorationForm() {
  return (
    <div className="">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Server Name:
            <input
              type="text"
              name="serverName"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date:
            <input
              type="date"
              name="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time:
            <input
              type="time"
              name="time"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
            <textarea
              name="description"
              rows="4"
              cols="50"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
