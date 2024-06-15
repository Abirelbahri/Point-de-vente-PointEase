import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home/card-home.svg";
import { Particle, Services, Apropos, Cards, Contact, Type } from '../../components/home';

const Home = () => {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {" "}
                Welcome to our platform!
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
              increase your sales, and improve your business performance with
                <strong className="main-name"> PointEase </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>

          <Row>
            <Services />
          </Row>

          <Row>
            <Apropos />
          </Row>

          <Row>
            <Cards />
          </Row>

          <Row>
            <Contact />
          </Row>
        </Container>
      </Container>
    </section>
  )
}

export default Home