import React, { useState } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import AuthService from "..//services/AuthService";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await AuthService.loginUser(username, password);
      props.history.push({
        pathname: "/",
      });
      window.location.reload();
    } catch (e) {
      if (e !== undefined) {
        setMessage(
          "Error: Email or password are wrong or account is not active."
        );
      }
    }
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }
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
      <h3>Login with your Account</h3>
      <Row className="justify-content-center">
        <Form
          className="register-form"
          style={{ width: "300px", textAlign: "left" }}
          onSubmit={handleLogin}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Form.Group>
          {props.location.state !== undefined && message.length === 0 && (
            <Alert variant="success">{props.location.state}</Alert>
          )}
          {message.length > 0 && message !== undefined && (
            <Alert variant="danger">{message}</Alert>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginPage;
