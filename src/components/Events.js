import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import AuthService from "..//services/AuthService";

const Events = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [showBookButton, setBookButton] = useState(false);
  const [ticketsnumber, setTickets] = useState(0);
  const [state, setState] = useState({
    currentUser: undefined,
  });

  const API_URL = "http://localhost:8080/api/v1/events/";

  function getAllEvents() {
    axios.get(API_URL).then((res) => setLatestEvents(res.data));
  }

  function getUser() {
    const user = AuthService.getCurrentUser();
    if (user) {
      if (user.role[0] === "ROLE_USER") {
        setBookButton(true);
      }
      setState({
        currentUser: user,
      });
    }
    console.log(state.currentUser);
  }

  function bookTicket(id) {
    axios
      .put(
        API_URL + "tickets/" + id + "/" + state.currentUser.id,
        ticketsnumber,
        {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => getAllEvents());
  }

  function getEventsByType(type) {
    axios
      .get(API_URL + "type/" + type)
      .then((res) => setLatestEvents(res.data));
  }

  function getEventsByTitle(title) {
    axios
      .get(API_URL + "title/" + title)
      .then((res) => setLatestEvents(res.data));
  }

  useEffect(() => {
    getAllEvents();
    getUser();
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "type":
        value === "ALL" ? getAllEvents() : getEventsByType(value);
        break;
      case "title":
        value.length > 0 ? getEventsByTitle(value) : getAllEvents();
        break;
      case "quantity":
        setTickets(value);
        break;
      default:
        break;
    }
  }

  const eventsDiv =
    latestEvents.length > 0 ? (
      latestEvents.map((event) => (
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
            {showBookButton === true ? (
              <Form>
                {/* <Form.Group>
              <Form.Control
                type="number"
                name="ticket-number"
                min="1"
                max="5"
              />
            </Form.Group> */}
                <input
                  style={{ borderRadius: "5px", marginRight: "5px" }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="5"
                  onChange={handleChange}
                ></input>
                <Button variant="success" onClick={() => bookTicket(event.id)}>
                  Book Ticket
                </Button>
              </Form>
            ) : showBookButton === false &&
              state.currentUser !== undefined &&
              state.currentUser.role[0] === "ROLE_COMPANY" ? (
              <small style={{ color: "red" }}>
                Only USERS can book tickets!
              </small>
            ) : (
              <a href="/login">
                <Button type="button" class="btn">
                  Login as User to Book Ticket
                </Button>
              </a>
            )}
          </Card.Body>
        </Card>
      ))
    ) : (
      <h2>No results</h2>
    );

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#28292b",
        color: "white",
        minHeight: "900px",
        paddingTop: "30px",
      }}
    >
      <Container>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              name="title"
              placeholder="Search Event"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            {/* <Form.Label>Search Events by Tipe</Form.Label> */}
            <Form.Control as="select" name="type" onChange={handleChange}>
              <option>ALL</option>
              <option>CONCERT</option>
              <option>STANDUP</option>
              <option>FESTIVAL</option>
              <option>THEATRE</option>
              <option>SPORT</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {eventsDiv}
      </Container>
    </Container>
  );
};

export default Events;
