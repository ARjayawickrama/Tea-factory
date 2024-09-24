import React, { useState } from 'react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const getResponse = (userInput) => {
    const responses = {
      'hi': 'Hello! Welcome to the Tea Factory Management System. How can I assist you today?',
      'hello': 'Hello there! How can I help you with your tea factory operations today?',
      'how are you': 'I am a virtual assistant, always ready to assist you. How can I help you today?',
      'bye': 'Goodbye! Have a productive day managing the tea factory!',
      'what is your name': 'Hi, I am Leafy, your assistant for the Tea Factory Management System. How can I assist you?',
      'contact support': 'You can reach our customer support team at support@teafactory.com or call us at 123-456-7890 for assistance.',
      'need more help': 'Contact us below.\nIf you prefer to chat with a Happiness Hero to help you out, we are also available on Live Chat from 09:00 AM to 06:00 PM, Monday to Sunday!',
      'default': 'I am not sure how to respond to that. Could you please provide more details or ask a specific question related to the tea factory?'
    };

    const normalizedInput = userInput.toLowerCase();
    return responses[normalizedInput] || responses['default'];
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, fromUser: true }]);
    setInput('');

    setTimeout(() => {
      const botResponse = getResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, fromUser: false },
      ]);
    }, 1000);
  };

  const handleContinueChatting = () => {
    setMessages([...messages, { text: 'Please continue chatting with me. How can I assist you further?', fromUser: false }]);
  };

  const handleChatWithAgent = () => {
    setMessages([...messages, { text: 'Connecting you to a Happiness Hero... Please hold on.', fromUser: false }]);
    // Simulate connection to a live agent
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'A Happiness Hero will be with you shortly. In the meantime, feel free to ask me any questions.', fromUser: false },
      ]);
    }, 2000);
  };

  const handleVisitContactPage = () => {
    window.location.href = '/contactus'; // Redirect to the contact page
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
              {/* Display buttons only when bot sends 'need more help' response */}
              {msg.text.includes('Contact us below') && !msg.fromUser && (
                <div className="flex flex-col items-center mt-4 space-y-2">
                  <button
                    onClick={handleContinueChatting}
                    className="bg-blue-500 text-white p-2 rounded-lg w-full"
                  >
                    Continue Chatting with Leafy
                  </button>
                  <button
                    onClick={handleChatWithAgent}
                    className="bg-purple-500 text-white p-2 rounded-lg w-full"
                  >
                    Chat With a Happiness Hero
                  </button>
                  <button
                    onClick={handleVisitContactPage}
                    className="bg-green-500 text-white p-2 rounded-lg w-full"
                  >
                    Visit Contact Us Page
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-green-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
