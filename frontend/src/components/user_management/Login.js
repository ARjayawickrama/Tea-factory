import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginForm = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5004/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, userRole } = data;

    
      localStorage.setItem('token', token);

    
      if (userRole === 'admin') {
        window.location.href = '/adminhome';
        console.log("admin login");
      } else {
        window.location.href = '/';
      }

      handleClose();
    } catch (error) {
      console.error(error.message);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title children='text-xl font-semibold'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className=' font-semibold'>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className=' font-semibold'>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
             variant="primary"
             type="submit"
             style={{ marginTop: '10px' ,border: 'none'}}
             className="w-full bg-green-700 text-white  py-2 px-4 rounded focus:shadow-outline mt-4 hover:bg-green-600 font-semibold"
              >
             Login
           </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
