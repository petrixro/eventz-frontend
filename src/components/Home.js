import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import AuthService from "..//services/AuthService";
import axios from "axios";

const Home = () => {
  const API_URL = "http://localhost:8080/api/v1/events/";
  const [latestEvents, setLatestEvents] = useState([]);
  const [showBookButton, setBookButton] = useState(false);
  const [ticketsnumber, setTickets] = useState(0);
  const [state, setState] = useState({
    currentUser: undefined,
  });

  useEffect(() => {
    getAllEvents();
    getUser();
  }, []);

  function getAllEvents() {
    axios
      .get("http://localhost:8080/api/v1/events/")
      .then((res) => setLatestEvents(res.data));
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
      .post(
        API_URL + "tickets/" + id + "/" + state.currentUser.id,
        { tickets: ticketsnumber },
        {
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => getAllEvents());
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "quantity":
        setTickets(value);
        break;
      default:
        break;
    }
  }

  const eventsDiv = latestEvents.map((event) => (
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
          <small style={{ color: "red" }}>Only USERS can book tickets!</small>
        ) : (
          <a href="/login">
            <Button type="button" class="btn">
              Login as User to Book Ticket
            </Button>
          </a>
        )}
      </Card.Body>
    </Card>
  ));
  return (
    <Container fluid className="homepage">
      <Container>
        <Row>
          <Carousel style={{ marginTop: "30px" }}>
            <Carousel.Item>
              <img
                style={{
                  borderRadius: "15px",
                }}
                className="d-block mx-auto img-fluid"
                src={process.env.PUBLIC_URL + "/images/carousel1.jpg"}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Concerts</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{
                  borderRadius: "15px",
                }}
                className="d-block mx-auto img-fluid"
                src={process.env.PUBLIC_URL + "/images/carousel2.jpg"}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Theatre</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{
                  borderRadius: "15px",
                }}
                className="d-block img-fluid mx-auto"
                src={process.env.PUBLIC_URL + "/images/carousel3.jpg"}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Festivals</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: "50px" }}>
          <Col>
            <h4>Latest Events</h4>
            <br />
            {eventsDiv}
          </Col>
          {/* <Col style={{ textAlign: "right" }}>
            <h4 style={{ marginBottom: "30px" }}>Check All Categories</h4>
            <Button variant="primary" style={{ marginRight: "5px" }}>
              Concerts
            </Button>
            <Button
              variant="warning"
              style={{ color: "white", marginRight: "5px" }}
            >
              Festivals
            </Button>
            <Button variant="info" style={{ marginRight: "5px" }}>
              Sports
            </Button>
            <Button variant="secondary" style={{ marginRight: "5px" }}>
              Theatre
            </Button>
            <Button variant="success" style={{ marginRight: "5px" }}>
              Stand-up
            </Button>
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
