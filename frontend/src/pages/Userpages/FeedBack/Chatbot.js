// Chatbot.js
import React, { useState } from 'react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const getResponse = (userInput) => {
    // Basic example of automated responses based on user input
    const responses = {
      'hi': 'Hi, how are you sir... How can I help you today?',
      'hello': 'Hello! How can I assist you today?',
      'how are you': 'I am good, thank you for asking! How can I help you?',
      'bye': 'Goodbye! Have a great day!',
      'what is your name': 'Hi My name is Leafy',
      'default': 'I am not sure how to respond to that. Can you please elaborate?'
    };

    // Normalize the user input to lowercase for matching
    const normalizedInput = userInput.toLowerCase();
    return responses[normalizedInput] || responses['default'];
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, fromUser: true }]);
    setInput('');

    // Simulate a response from the chatbot
    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, fromUser: false },
      ]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full bg-white border border-gray-300 rounded-xl shadow-xl">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-green-500">Leafy</h3>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>
        <div className="h-60 overflow-y-scroll p-2 border border-gray-200 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${msg.fromUser ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="p-2 bg-green-500 text-white rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
