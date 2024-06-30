import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Registration = ({ show, handleClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5004/Member/member_register', { 
        name, username, email, password, phoneNumber, gender 
      });
      handleClose(); 
      alert('Registration successful. You can now log in.');
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='font-semibold text-xl mb-2'>registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="registration-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <Form.Label className="block text-gray-700 font-semibold mb-2">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="form-group">
              <Form.Label className="block text-gray-700 font-semibold mb-2">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="form-group">
              <Form.Label className="block text-gray-700 font-semibold mb-2">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="form-group">
              <Form.Label className="block text-gray-700 font-semibold mb-2">Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="form-group">
              <Form.Label className="block text-gray-700 font-semibold mb-2">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="form-group">
              <Form.Label className="block text-gray-700  mb-2  font-semibold mb-2 ">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="form-group mt-4">
            <Form.Label className="block text-gray-700 font-semibold mb-2">Gender</Form.Label>
            <div className="flex items-center">
              <Form.Check
                inline
                label="Male"
                name="gender"
                type="radio"
                id="male"
                value="Male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                id="female"
                value="Female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <Form.Check
                inline
                label="Prefer not to say"
                name="gender"
                type="radio"
                id="preferNotToSay"
                value="Prefer not to say"
                checked={gender === 'Prefer not to say'}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
         
          </div>
          <Button
            variant="primary"
            type="submit"
            style={{ border: 'none' }} 
            className="w-full bg-green-700 text-white font-semibold py-2 px-4 rounded focus:shadow-outline mt-4 hover:bg-green-600"
          >
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
