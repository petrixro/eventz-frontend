import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const Footer = () => {
  return (
    <Container fluid>
      <Row
        className="justify-content-center"
        style={{ backgroundColor: "black", color: "white", paddingTop: "20px" }}
      >
        <h5>Eventz App. Discover all near events</h5>
      </Row>
      <Row
        className="justify-content-center"
        style={{
          backgroundColor: "black",
          color: "white",
          paddingBottom: "20px",
        }}
      >
        <small>© 2021 Copyright: Eventz App</small>
      </Row>
    </Container>
  );
};
export default Footer;
