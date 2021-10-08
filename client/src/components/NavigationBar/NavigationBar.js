import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Logout from '../Logout/Logout';
import './NavigationBar.css';

const NavigationBar = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="/home">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {currentUser && (
              <>
                <Nav.Link href="/books?page=1" style={{ marginTop: '2%' }}>
                  Books
                </Nav.Link>
                <NavDropdown title="My Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/activity">
                    My activity
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/reviews">
                    My reviews
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {currentUser && currentUser.role === 'Admin' && (
              <NavDropdown title="Admin Panel" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/users">
                  User Management
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin/createBook">
                  Create Book
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Logout />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
