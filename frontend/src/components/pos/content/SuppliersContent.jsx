import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import getDate from "../../../utils/getDate";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "semantic-ui-react";
import { Card, Input, Form } from "semantic-ui-react";

const SuppliersContent = () => {
  const [Suppliers, setSuppliers] = useState([]);
  const suppliersRef = collection(db, "suppliers");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const deleteSupplier = async (id, e) => {
    const supplierDoc = doc(db, "suppliers", id);
    await deleteDoc(supplierDoc);
    console.log("the data has been deleted");
  };

  useEffect(() => {
    const getsuppliers = async () => {
      const data = await getDocs(suppliersRef);
      setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getsuppliers();
  }, []);

  return (
    <div className="px-4 py-lg-4">
      <div className="title mb-5 mt-5 mt-lg-0">
        <h1>Suppliers</h1>
        <small className="text-muted">{getDate()}</small>
      </div>

      <div>
        <Input
          placeholder="Search Supplier"
          icon="search"
          style={{ width: "500px", margin: "10px" }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <Link to="/addSuppliers">
          <button floated="left" primary class="ui button">
            Add New
          </button>
        </Link>
      </div>

      <br />
      <div className="card-container">
        <Card.Group itemsPerRow={4}>
          {Suppliers.filter((Suppliers) => {
            return search.toLowerCase() === ""
              ? Suppliers
              : Suppliers.name.toLowerCase().includes(search);
          }).map((suppliers, index) => (
            <Card key={index}>
              <Card.Content>
                <Card.Header> {suppliers.name}</Card.Header>
                <Card.Meta>{suppliers.company}</Card.Meta>
                <Card.Description>
                  <strong>Email : </strong>
                  {suppliers.email} <br />
                  <strong>Phone : </strong>
                  {suppliers.phone}{" "}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="blue"
                    onClick={() => {
                      navigate(`/updatesuppliers/${suppliers.id}`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      deleteSupplier(
                        suppliers.id,
                        suppliers.email,
                      );
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default SuppliersContent;
