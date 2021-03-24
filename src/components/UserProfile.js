import React, { useState, useEffect } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import AuthService from "..//services/AuthService";

const UserProfile = (props) => {
  const [state, setState] = useState({
    currentUser: undefined,
    showAddEventButton: false,
  });

  function getUser() {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
        showAddEventButton: user.role.includes("ROLE_COMPANY"),
      });
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container
      fluid
      style={{
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        height: "800px",
      }}
    >
      <Container
        style={{
          border: "1px solid white",
          height: "600px",
          borderRadius: "15px",
        }}
      >
        {state.currentUser !== undefined && (
          <h2>{state.currentUser.username}'s Profile</h2>
        )}
        {state.showAddEventButton && <Button>Add Event</Button>}
      </Container>
    </Container>
  );
};

export default UserProfile;
