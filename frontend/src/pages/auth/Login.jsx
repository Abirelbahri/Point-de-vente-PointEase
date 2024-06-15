import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Particle } from "../../components/home";
import { useNavigate } from "react-router-dom";
import connectLogo from "../../assets/auth/seconnecter.svg";
import { auth, googleAuth } from "../../firebase-config";
import { BsFillPersonPlusFill } from "react-icons/bs";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Button, Form } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const validate = () => {
    let error = {};
    if (!email){
      error.email = "Email is required";
    } if (!password){
      error.password = "password is required";
    } 
    return error;
  };

  const signIn = async (e) => {
    e.preventDefault();
    let error = validate();
    if(Object.keys(error).length) return setError(error);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/pos");
      })
      .catch((error) => {
        setError(true);
      });
  };

  const GooglesignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      navigate("/pos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Container fluid className="about-section mt-5">
        <Particle />

        <Row
          style={{
            justifyContent: "center",
            border: "2px",
          }}
        >
          <Col
            md={4}
            style={{ paddingTop: "0px", paddingBottom: "50px" }}
            className=""
          >
            <h4>Have an Account </h4>
            <Form>
              <Form.Field>
                <label>Email</label>
                <Form.Input
                  autoFocus
                  placeholder="name@mail.com"
                  error={error.email ? { content: error.email } : null}
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input   
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error.password ? { content: error.password } : null}
                />
              </Form.Field>
              <Button type="submit" onClick={signIn}>Submit</Button>
              <Link to="/signup"><Button style={{width:"160px"}}>Create Account<BsFillPersonPlusFill/></Button></Link>
            </Form>

          </Col>
          <Col>
            <img
              src={connectLogo}
              alt="open door pic"
              className="img-fluid"
              style={{ maxHeight: "350px" }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Login;
