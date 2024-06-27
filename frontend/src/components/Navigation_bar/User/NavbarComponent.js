import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import LoginForm from '../../user_management/Login';
import Register from '../../user_management/Registration';
import logo from '../../../assets/logo.png';

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/'); 
  };

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      setUserRole(decodedToken.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserRole('');
    }
  }, []);

  const navbarStyle = {
    background: 'linear-gradient(to right, #fff, #ffff)',
    color: 'green',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '10%',
    borderRadius: '20px',
    width: '60%',
  };

  const linkStyle = {
    color: 'black',
    cursor: 'pointer',
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={navbarStyle}>
        <Container>
        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', color: 'green', fontWeight: 'bold', cursor: 'pointer' }}>
      <img src={logo} alt="Logo" style={{ width: '30px', height: 'auto', marginRight: '1px' }} /> {/* Adjust width and height as needed */}
      Soba Tea
    </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {(!isLoggedIn || (isLoggedIn && userRole !== 'admin')) && (
                <>
                  <Nav.Link as={Link} to="/" style={linkStyle} className='font-semibold'>
                  Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/equipment" style={linkStyle} className='font-semibold'>
                    Equipment
                  </Nav.Link>
                </>
              )}
              {isLoggedIn && userRole === 'admin' && (
                <NavDropdown title="Dropdown" id="basic-nav-dropdown" className='font-semibold  ml-28'>
                  <NavDropdown.Item as={Link} to="/action1" style={linkStyle}>
                    Action 1
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/action2" style={linkStyle}>
                    Action 2
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/another-action" style={linkStyle}>
                    Another Action
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  {userRole === 'admin' ? (
                    <>
                      <Nav.Link as={Link} to="/adminhome" style={linkStyle} className='font-semibold'>
                        Admin Dashboard
                      </Nav.Link>
                      <Button variant="outline-danger" onClick={handleLogout} className="border px-1 py-1 rounded-2xl font-semibold">
                        Admin Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline-danger" onClick={handleLogout} className="border px-1 py-1 rounded-2xl">
                        User Logout
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleShowLogin} style={linkStyle} className='font-semibold'>
                    Login
                  </Nav.Link>
                  <Nav.Link onClick={handleShowRegister} style={linkStyle} className='font-semibold'>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
      <Register show={showRegister} handleClose={handleCloseRegister} />
      <LoginForm show={showLogin} handleClose={handleCloseLogin} />
    </>
  );
};

export default NavbarComponent;
