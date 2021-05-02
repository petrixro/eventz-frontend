import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Container, Form, Row, Button, Alert, Modal } from "react-bootstrap";
import AuthService from "..//services/AuthService";

const UserProfile = (props) => {
  const [state, setState] = useState({
    currentUser: undefined,
    showAddEventButton: false,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setDate] = useState(new Date());

  function setnewDate() {
    console.log(date);
  }

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
        {state.showAddEventButton && (
          <Button onClick={handleShow}>Add Event</Button>
        )}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title:</Form.Label>
              <Form.Control type="text" name="title" max="30" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tickets:</Form.Label>
              <Form.Control type="number" name="tickets" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date:&nbsp;&nbsp; </Form.Label>
              <DateTimePicker onChange={setDate} value={date} />
              <Button variant="secondary" onClick={setnewDate}>
                Close
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
