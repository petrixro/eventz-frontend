import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

const Events = () => {
  const [latestEvents, setLatestEvents] = useState([]);

  const API_URL = "https://petrix-eventz-back.herokuapp.com/api/v1/events/";

  function getAllEvents() {
    axios.get(API_URL).then((res) => setLatestEvents(res.data));
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
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "type":
        getEventsByType(value);
        break;
      case "title":
        value.length > 0 ? getEventsByTitle(value) : getAllEvents();
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
            backgroundColor: "black",
            borderColor: "white",
            marginBottom: "5px",
          }}
        >
          <Card.Header style={{ backgroundColor: "white", color: "black" }}>
            {new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(Date.parse(event.date))}
            , {event.location}
          </Card.Header>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Button variant="primary">Book Ticket</Button>
          </Card.Body>
        </Card>
      ))
    ) : (
      <h2>No results</h2>
    );

  return (
    <Container
      fluid
      style={{ backgroundColor: "black", color: "white", minHeight: "600px" }}
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
