import React from 'react';
import notfound from "../../assets/notfound/notfound.svg";
import { Row, Col } from "react-bootstrap";


const NotFound = () => {
  return (
      <>
<Row style={{ justifyContent: "center", padding: "10px" }}>
<Col
            md={4}
            style={{
              justifyContent: "center",
              paddingTop: "150px",
              paddingBottom: "50px",
            }}
          >
            <img
              src={notfound}
              alt="notfound"
              className="img-fluid"
              style={{ maxHeight: "500px" }}
            />

          </Col>
         
</Row>
    </>
  )
}

export default NotFound