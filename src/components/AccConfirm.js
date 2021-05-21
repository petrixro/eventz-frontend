import React, { useState } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";

const AccConfirm = (props) => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#28292b",
        color: "white",
        textAlign: "center",
        height: "800px",
        paddingTop: "30px",
      }}
    >
      <h2 style={{ color: "#007bff" }}>Account Verified!</h2>
      <br />
      <br />
      <h3>Click the link bellow to Login</h3>
      <a href="/login">
        <Button type="button" class="btn">
          Login Now
        </Button>
      </a>
    </Container>
  );
};
export default AccConfirm;
