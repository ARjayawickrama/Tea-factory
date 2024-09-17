import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import LoginForm from "../../user_management/Login";
import Register from "../../user_management/Registration";
import logo from "../../../assets/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  toast.success("Logout Successful!");
};

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
    setToken("");
    navigate("/");
    notify();
  };

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return {};
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");

    if (storedToken) {
      const decodedToken = decodeToken(storedToken);
      setUserRole(decodedToken.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserRole("");
    }
  }, []);

  const navbarStyle = {
    background: "linear-gradient(to right, #fff, #ffff)",
    color: "green",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "10%",
    borderRadius: "20px",
    width: "60%",
  };

  const linkStyle = {
    color: "black",
    cursor: "pointer",
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={navbarStyle}>
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <img
              src={logo}
              alt="Fairy Mount Tea Logo"
              style={{ width: "30px", height: "auto", marginRight: "10px" }}
            />
            Fairy Mount
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link
                as={Link}
                to="/"
                style={{ ...linkStyle, marginRight: "10px" }}
                className="font-semibold"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Product"
                style={{ ...linkStyle, marginRight: "10px" }}
                className="font-semibold"
              >
                Order
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/gallery"
                style={{ ...linkStyle, marginRight: "10px" }}
                className="font-semibold"
              >
                Gallery
              </Nav.Link>
              <NavDropdown
                title="Service"
                id="basic-nav-dropdown"
                className="font-semibold"
              >
                <NavDropdown.Item href="#equipment" style={linkStyle}>
                  Equipment
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/action2" style={linkStyle}>
                  Action 2
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  to="/another-action"
                  style={linkStyle}
                >
                  Another Action
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  {userRole === "admin" ? (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/adminhome"
                        style={linkStyle}
                        className="font-semibold"
                      >
                        Admin
                      </Nav.Link>

                   
                      <Button
                        variant="outline-danger"
                        onClick={handleLogout}
                        className="border px-2 py-1 rounded-2xl font-semibold"
                        disabled={!token}
                        style={{ opacity: !token ? 0.5 : 1 }}
                      >
                        Admin Logout
                      </Button>
                    </>
                  ) : userRole === "admin2" ? (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/Maintainingdashboard"
                        style={linkStyle}
                        className="font-semibold"
                      >
                        Maintain Manager Dashboard
                      </Nav.Link>
                      <Button
                        variant="outline-danger"
                        onClick={handleLogout}
                        className="border px-2 py-1 rounded-2xl"
                        disabled={!token}
                        style={{ opacity: !token ? 0.5 : 1 }}
                      >
                        Admin2 Logout
                      </Button>
                    </>
                  ) : userRole === "admin3" ? (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/superviseDashbord"
                        style={linkStyle}
                        className="font-semibold"
                      >
                        Supervise Dashboard
                      </Nav.Link>
                      <Button
                        variant="outline-danger"
                        onClick={handleLogout}
                        className="border px-2 py-1 rounded-2xl"
                        disabled={!token}
                        style={{ opacity: !token ? 0.5 : 1 }}
                      >
                        Supervise Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-danger"
                      onClick={handleLogout}
                      className="border px-2 py-1 rounded-2xl"
                      disabled={!token}
                      style={{ opacity: !token ? 0.5 : 1 }}
                    >
                      User Logout
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Nav.Link
                    onClick={handleShowLogin}
                    style={linkStyle}
                    className="font-semibold"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleShowRegister}
                    style={linkStyle}
                    className="font-semibold"
                  >
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
