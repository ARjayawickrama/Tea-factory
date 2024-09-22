import React, { useState } from 'react';
import { MdFeedback } from 'react-icons/md';
import Isus from './Isus'; // Adjust the import path as necessary

const YourComponent = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalisus = () => {
    setModalIsOpen(true);
  };

  return (
    <div className=" relative left-96 ml-8  bottom-20 ">
      <button
        onClick={openModalisus}
        className="w-48 bg-sky-500 p-2 border rounded-lg shadow-lg"
      >
        <MdFeedback className="w-10 h-10 text-white " />
        Isus
      </button>

      <Isus
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default YourComponent;
