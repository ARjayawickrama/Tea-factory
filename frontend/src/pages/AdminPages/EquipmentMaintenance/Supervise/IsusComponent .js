import React, { useState } from 'react';
import { MdFeedback } from 'react-icons/md';
import Isus from './Isus'; // Adjust the import path as necessary

const YourComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalisus = () => {
    setModalIsOpen(true);
  };

  return (
    <div className=" absolute   right-3   bottom-0 ">
      <button
        onClick={openModalisus}
        className="w-48 h-20  p-2 border rounded-lg shadow-lg"
      >
        <MdFeedback className="w-14 h-14 text-white ml-16 " />
      
      </button>

      <Isus
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default YourComponent;
