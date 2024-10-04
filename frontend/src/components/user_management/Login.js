import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import logo from '../../assets/logo.png';


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
      const { token, userRole, userId } = data;

    
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

    
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
    <Modal show={show} onHide={handleClose} centered className='focus:ring-0'>
      <Modal.Header closeButton> 
       
  <img src={logo} alt="Logo" style={{ width: '30px', height: 'auto', marginRight: '1px' }} /><p className='text-xl font-semibold text-green-800 '>Soba Tea</p>


<Modal.Title children='text-xl font-semibold ' className='absolute right-12'>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className='font-semibold '>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='focus:ring-0'
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className='font-semibold '>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className=' focus:ring-0'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
             variant="primary"
             type="submit"
             style={{ marginTop: '10px' ,border: 'none'}}
             className="w-full px-4 py-2 mt-4 font-semibold text-white bg-green-700 rounded focus:shadow-outline hover:bg-green-600"
              >
             Login
           </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
