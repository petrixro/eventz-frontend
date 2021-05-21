import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import AuthService from "..//services/AuthService";
import axios from "axios";

const UserProfile = (props) => {
  const API_URL = "http://localhost:8080/api/v1/events/";
  const [state, setState] = useState({
    currentUser: undefined,
    showAddEventButton: false,
  });
  const [userEvents, setUserEvents] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventdate, setDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventTickets, setEventTickets] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const data = {
    title: eventTitle,
    tickets: eventTickets,
    type: eventType,
    date: eventdate,
    location: eventLocation,
    description: eventDescription,
  };

  function addEvent() {
    axios
      .post(API_URL + "add/" + state.currentUser.id, data, {
        headers: { Authorization: `Bearer ${state.currentUser.token}` },
      })
      .then((res) => {
        getEventsByUser(state.currentUser.id);
        handleClose();
      });
  }

  function getEventsByUser(userid) {
    axios
      .get(API_URL + "user/" + userid)
      .then((res) => setUserEvents(res.data));
  }

  async function deleteEvent(eventid) {
    await axios
      .delete(API_URL + eventid, {
        headers: { Authorization: `Bearer ${state.currentUser.token}` },
      })
      .then((res) => getEventsByUser(state.currentUser.id));
  }

  function getUser() {
    const user = AuthService.getCurrentUser();
    if (user) {
      getEventsByUser(user.id);
      setState({
        currentUser: user,
        showAddEventButton: user.role.includes("ROLE_COMPANY"),
      });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "type":
        setEventType(value);
        break;
      case "title":
        setEventTitle(value);
        break;
      case "description":
        setEventDescription(value);
        break;
      case "tickets":
        setEventTickets(value);
        break;
      case "location":
        setEventLocation(value);
        break;
      default:
        break;
    }
  }

  const eventsDiv =
    userEvents.length > 0 ? (
      userEvents.map((event) => (
        <Card
          style={{
            backgroundColor: "#28292b",
            borderColor: "white",
            marginBottom: "5px",
          }}
        >
          <Card.Header style={{ backgroundColor: "white", color: "black" }}>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(Date.parse(event.date))}
            , {event.location}
          </Card.Header>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              {event.description}
              <br />
              <small>Tickets left: {event.tickets}</small>
            </Card.Text>
            <Button
              variant="success"
              style={{ marginRight: "5px", textAlign: "right" }}
            >
              Update Event
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => deleteEvent(event.id)}
            >
              Delete Event
            </Button>
          </Card.Body>
        </Card>
      ))
    ) : (
      <h2>No events</h2>
    );

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
      <Container>
        {state.currentUser !== undefined && (
          <h2>{state.currentUser.username}'s Profile</h2>
        )}
        <Row style={{ textAlign: "left" }}>
          <Col>
            {state.showAddEventButton && (
              <Button onClick={handleShow} style={{ marginBottom: "5px" }}>
                Add Event
              </Button>
            )}
            {eventsDiv}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                max="30"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tickets:</Form.Label>
              <Form.Control
                type="number"
                name="tickets"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date:</Form.Label>
              <br />
              <DateTimePicker onChange={setDate} value={eventdate} />
              {/* <Button variant="secondary" onClick={setnewDate}>
                Close
              </Button> */}
            </Form.Group>
            <Form.Group controlId="AddEventType">
              <Form.Label>Event Type:</Form.Label>
              <Form.Control as="select" name="type" onChange={handleChange}>
                <option>CONCERT</option>
                <option>STANDUP</option>
                <option>FESTIVAL</option>
                <option>THEATRE</option>
                <option>SPORT</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="EventDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="EventLocation">
              <Form.Label>Event Location:</Form.Label>
              <Form.Control as="select" name="location" onChange={handleChange}>
                <option>Bucharest</option>
                <option>Iasi</option>
                <option>Cluj Napoca</option>
                <option>Constanta</option>
                <option>Brasov</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
