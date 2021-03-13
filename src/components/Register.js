import React, { useState } from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import AuthService from "../services/AuthService";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verpassword, setverPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  function registerUser(username, email, password, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role,
    });
  }

  function handleRegister() {
    registerUser(username, email, password, role);
  }

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
      <h3>Register a new Account</h3>
      <Row className="justify-content-center">
        <Form
          className="register-form"
          style={{ width: "300px", textAlign: "left" }}
          onSubmit={handleRegister}
        >
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              minLength="3"
              maxLength="20"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              minLength="3"
              maxLength="20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              minLength="3"
              maxLength="20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="passwordconfirm"
              placeholder="Repeat Password"
              minLength="3"
              maxLength="20"
              value={verpassword}
              onChange={(e) => setverPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>I am:</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>USER</option>
              <option>COMPANY</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterPage;
