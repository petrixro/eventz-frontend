import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

const Home = () => {
  const [latestEvents, setLatestEvents] = useState([]);

  function getAllEvents() {
    axios
      .get("https://petrix-eventz-back.herokuapp.com:/api/v1/events/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => setLatestEvents(res.data));
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  const eventsDiv = latestEvents.map((event) => (
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
          <Col style={{ textAlign: "right" }}>
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
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
