import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import serviceLogo from "../../assets/home/bg-service.svg";

function Services() {
  return (
    <Container fluid className="home-about-section" id="services">
      <Container>
        <Row>
          <Col md={4} className="myAvtar">
            <img
              src={serviceLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              Our<span className="purple"> Services</span>
            </h1>
            <p className="home-about-body">
              <b className="purple">Our services</b> are designed to assist
              managers in effectively managing their sales and stocks.
              <br />
              <br />
              We offer a comprehensive point of sale solution that allows
              businesses to easily manage their products, inventory, and sales,
              <i>
                offering advanced features such as total calculation and ticket
                printing.
              </i>
              <br />
              <br />
              <i>
                <b className="purple"></b> Our team is available to assist you
                at every step of the process, whether it's providing product
                recommendations or helping you set up your point of sale system.{" "}
                <b className="purple">
                  We're here to help you optimize your business and enhance your
                  selling experience.
                </b>
              </i>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Services;
