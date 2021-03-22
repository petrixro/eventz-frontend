import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import AuthService from "..//services/AuthService";

const NavbarComponent = () => {
  const [state, setState] = useState({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setState({
        currentUser: user,
      });
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="#home">Eventz</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Nav>
          {state.currentUser ? (
            <Nav>
              <Nav.Link href="/myprofile">
                {state.currentUser.username}
              </Nav.Link>
              <Nav.Link href="/login" onClick={logOut}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
