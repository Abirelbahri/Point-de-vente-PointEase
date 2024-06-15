import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutLogo from "../../assets/home/bg-home.svg";

function Apropos() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              About<span className="purple"> us</span>
            </h1>
            <p className="home-about-body">
              Our company was founded with a clear mission: to help businesses
              manage their sales and stocks more effectively. Since then, we
              have worked with hundreds of clients to provide them with the
              tools they need to succeed.
              <br />
              <br />
              Our team consists of experienced professionals in the fields of
              retail, inventory management, and software development. We work
              hard to deliver top-quality products to our clients, and we take
              pride in our commitment to customer service. Our goal is to make
              your point of sale experience
              <i>
                <b className="purple">
                  as efficient and user-friendly as possible
                </b>
              </i>
              <br />
              <br />
              <b className="purple">We </b>
              are confident that our expertise and dedication to our clients
              enable us to provide the best point of sale solutions available in
              the market.
              <br />
              <br />
              <br />
              <br />
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <img
              src={aboutLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Apropos;
