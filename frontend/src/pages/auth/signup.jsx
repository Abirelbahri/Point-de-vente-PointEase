import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Particle } from "../../components/home";
import connectLogo from "../../assets/auth/seconnecter.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { auth, googleAuth } from "../../firebase-config";
import { BsFillPersonCheckFill } from "react-icons/bs";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Signup() {
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
            style={{ paddingTop: "0px", paddingBottom: "100px" }}
            className=""
            
          >
            <h4>Create an Account </h4>
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
              <Button type="submit" onClick={signIn}>
                Submit
              </Button>
              <Link to="/login">
                <Button style={{width:"160px"}}>Have Account <BsFillPersonCheckFill/></Button>
              </Link>
            </Form>
          </Col>

          {/* image */}

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

export default Signup;
