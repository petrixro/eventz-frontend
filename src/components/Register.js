import React, { useState } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthService from "..//services/AuthService";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [verpassword, setverPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [verpasswordError, setverpasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "username":
        setUsername(value);
        setUsernameError(
          value.length < 5 || value.length > 20
            ? "Full Name must be 5 characters long!"
            : ""
        );
        break;
      case "email":
        setEmail(value);
        setEmailError(validEmailRegex.test(value) ? "" : "Email is not valid!");
        break;
      case "password":
        setPassword(value);
        setpasswordError(
          value.length < 8 ? "Password must be 8 characters long!" : ""
        );
        break;
      case "passwordconfirm":
        setverPassword(value);
        setverpasswordError(
          password !== value ? "Passwords must be the same!" : ""
        );
        break;
      default:
        break;
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    try {
      await AuthService.registerUser(username, email, password, role);

      props.history.push({
        pathname: "/login",
        state: "Account created! Please activate it before login!",
      });
    } catch (e) {
      if (e !== undefined) {
        setMessage(e.response.data);
      }
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
              onChange={handleChange}
            />
            {usernameError.length > 0 && (
              <small>
                <p>{usernameError}</p>
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            />
            {emailError.length > 0 && (
              <small>
                <p>{emailError}</p>
              </small>
            )}
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
            {passwordError.length > 0 && (
              <small>
                <p>{passwordError}</p>
              </small>
            )}
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
              onChange={handleChange}
            />
            {verpasswordError.length > 0 && (
              <small>
                <p>{verpasswordError}</p>
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>I want to use the platform as:</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>USER</option>
              <option>COMPANY</option>
            </Form.Control>
            {message.length > 0 && message !== undefined && (
              <small>
                <p>{message}</p>
              </small>
            )}
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
