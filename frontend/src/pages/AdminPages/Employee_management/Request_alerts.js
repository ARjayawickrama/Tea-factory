import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isSendEnabled, setIsSendEnabled] = useState(false);

  const handleAddClick = () => {
    setIsSendEnabled(true);
  };

  return (
    <div>
      <h1 className='text-gray-100'>mzdmmdfmcx</h1>
      <button onClick={handleAddClick}>Add</button>
      {/* Use Link to navigate to the Software page */}
      <Link to="/Ex1" state={{ isSendEnabled }}>
        <button>Go to Send Page</button>
      </Link>
    </div>
  );
}
