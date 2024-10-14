import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the logout icon
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../App.css'; // Ensure to import your CSS file

function CollapsibleNavbar() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.username) {
          setUsername(user.username);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    setUsername(null); // Update state to reflect logged-out status
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <div className="header__logo">
            <a href="/">
              <img src="/assets/img/logo.png" alt="" />
            </a>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mx-auto justify-content-center">
              <Nav.Link className="mx-3 font-weight-bold text-white" href="/">Home</Nav.Link>
              <Nav.Link className="mx-3 font-weight-bold text-white" href="/favorites">Favourite</Nav.Link>
              <Nav.Link className="mx-3 font-weight-bold text-white" href="/blog">Blog</Nav.Link>

              {username ? (
                <NavDropdown
                  className="mx-3 font-weight-bold nav-dropdown"
                  title={<span className="text-white">{`Hello, ${username}`}</span>}
                  id="collasible-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" /> {/* Add Logout Icon */}
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link className="mx-3 font-weight-bold text-white" href="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleNavbar;
