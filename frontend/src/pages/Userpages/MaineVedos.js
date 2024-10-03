import React, { useState, useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import MyVideo1 from "../../assets/main4.mp4";

export default function MaineVedos() {
  const navigate = useNavigate(); 
  const formRef = useRef(null); 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(""); 

  const handleClick = () => {
    navigate("/home"); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Submitted:", name, email, message);
    axios
      .post("http://localhost:5004/contact", { name, email, message })
      .then(() => {
      
        setName("");
        setEmail("");
        setMessage("");

        
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
     
    }
  };

  useEffect(() => {
   
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    
    const intervalId = setInterval(updateTime, 1000);
    updateTime(); 

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(intervalId); 
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  const validateName = (value) => {
 
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  };


  const handleNameChange = (e) => {
    const { value } = e.target;
   
    if (validateName(value) || value === "") {
      setName(value);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={MyVideo1}
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={handleClick}
          className="bg-green-600 hover:bg-lime-700 animate-bounce delay-150 text-white w-48 h-14 font-semibold px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Click Now
        </button>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="fixed bottom-0 right-4 z-10 bg-white p-4 max-w-xs w-96 shadow-lg rounded-lg "
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange} // Use the new handler
            placeholder="Enter your name" // Placeholder for the name input
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" // Placeholder for the email input
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message" // Placeholder for the textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {/* Clock display */}
      <div className="absolute top-4 right-4 z-20 bg-white p-2 rounded shadow-md">
        <span className="text-lg font-semibold">{currentTime}</span>
      </div>
    </div>
  );
}
