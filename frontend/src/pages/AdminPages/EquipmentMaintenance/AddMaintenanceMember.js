import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Ex1() {
  const location = useLocation();
  const isSendEnabled = location.state?.isSendEnabled || false;

  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  return (
    <div>
      <h1>Count</h1>
      <button
        onClick={handleButtonClick}
        className={`bg-black w-7 ${isSendEnabled ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
        disabled={!isSendEnabled}
      >
        Enable now
      </button>
    </div>
  );
}
