import React from 'react';

export default function SupervisorIssue({ feedbackData = [], onDelete }) {

  const exampleData = [
    { area: 'Production', name: 'John Doe', feedback: 'The machines are running smoothly.' },
    { area: 'Quality Control', name: 'Jane Smith', feedback: 'We need more frequent checks.' },
    { area: 'Packaging', name: 'Mike Johnson', feedback: 'Packaging materials are low.' },
  ];

  const dataToDisplay = feedbackData.length > 0 ? feedbackData : exampleData;

  return (
    <div className="flex justify-center">
      <div className="relative max-w-4xl ">
        <h2 className="text-xl font-semibold mb-4">Submitted Feedback</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 border-b">Area</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Name</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Feedback</th>
              <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((feedback, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{feedback.area}</td>
                <td className="py-2 px-4 border-b">{feedback.name}</td>
                <td className="py-2 px-4 border-b">{feedback.feedback}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
