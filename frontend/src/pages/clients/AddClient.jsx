import { NavBar, SideBar } from "../../components/pos";
import "../posApp.scss";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { useNavigate, Link, useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { Button, Grid, Loader, Form } from "semantic-ui-react";
import { AiOutlineClose } from "react-icons/ai";
const initialState = {
  name: "",
  phone: "",
  email: "",
  adress: "",
};
const AddClient = () => {
  const [Client, SetClient] = useState(initialState);
  const { name, email, phone, adress } = Client;
  const [isSubmit, setIsSubmit] = useState(false);
  const cientsRef = collection(db, "clients");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async () => {
    const updateRef = doc(db, "clients", id);
    const snapshot = await getDoc(updateRef);
    if (snapshot.exists()) {
      SetClient({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    SetClient({ ...Client, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!phone) errors.phone = "phone is required";
    if (!email) errors.email = "email is required";
    if (!adress) errors.adress = "adress is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).lenght) return setErrors(errors);
    setIsSubmit(true);
    if(!id){
      try{
        await addDoc(cientsRef, { ...Client, timestamp: serverTimestamp() });
       
      }catch(error){
        console.log(error);
      }
    }
    else{
      try{
        await updateDoc(doc(db, "clients",id), { ...Client, timestamp: serverTimestamp() });

      }catch(error){
        console.log(error);
      }
    }
    navigate("/clients");

  };

  return (
    <div className="posApp2">
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
        <div className="col-md-1 text-lg-center d-none d-lg-block">
          <SideBar active={"clients"} />
        </div>
        <div className="col">
          <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: "80vh", margin: "20px" }}
          >
            <Grid.Row>
              <Link to="/clients">
                <AiOutlineClose />
              </Link>
              <Grid.Column textAlign="center">
                <div>
                  <h2>{id? "Update Client" : "Add Client"}</h2>
                  <br />
                  {isSubmit ? (
                    <Loader active inline="centered" size="huge" />
                  ) : (
                    <>
                      <Form onSubmit={handleSubmit}>
                        <Form.Input
                          type="text"
                          name="name"
                          placeholder="Enter Client Name"
                          onChange={handleChange}
                          value={name}
                          error={errors.name ? { content: errors.name } : null}
                          autoFocus
                        />
                        <Form.Input
                          type="number"
                          name="phone"
                          placeholder="Enter Phone"
                          onChange={handleChange}
                          value={phone}
                          error={
                            errors.phone ? { content: errors.phone } : null
                          }
                        />
                        <Form.Input
                          type="text"
                          name="adress"
                          placeholder="Enter Adress"
                          onChange={handleChange}
                          value={adress}
                          error={
                            errors.adress ? { content: errors.adress } : null
                          }
                        />
                        <Form.Input
                          type="email"
                          name="email"
                          placeholder="Enter Email"
                          onChange={handleChange}
                          value={email}
                          error={
                            errors.email ? { content: errors.email } : null
                          }
                        />
                        <Button primary type="submit">
                          Submit
                        </Button>
                      </Form>
                    </>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
