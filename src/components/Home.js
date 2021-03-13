import React from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  return (
    <Container fluid className="homepage">
      <Row>
        <Carousel>
          <Carousel.Item>
            <img
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
      <Row style={{ height: "200px" }}></Row>
    </Container>
  );
};

export default Home;
