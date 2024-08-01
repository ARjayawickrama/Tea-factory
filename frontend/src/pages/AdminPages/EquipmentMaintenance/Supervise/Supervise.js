import React, { useState } from 'react';

export default function Supervise() {
  const [machineName, setMachineName] = useState('');
  const [machineId, setMachineId] = useState('');
  const [image, setImage] = useState(null);
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="p-14 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Report Machine Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="machineName" className="block text-sm font-medium text-gray-700">
            Machine Name
          </label>
          <input
            id="machineName"
            type="text"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="machineId" className="block text-sm font-medium text-gray-700">
            Machine ID
          </label>
          <input
            id="machineId"
            type="text"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700">
            Issue Description
          </label>
          <textarea
            id="issueDescription"
            rows="4"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
