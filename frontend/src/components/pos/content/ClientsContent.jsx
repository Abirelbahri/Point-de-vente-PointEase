import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase-config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import getDate from "../../../utils/getDate";
import { Table } from "semantic-ui-react";
import { Input, Button} from "semantic-ui-react";

const ClientsContent = () => {
  const [clients, setclients] = useState([]);
  const clientsRef = collection(db, "clients");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const deleteClient = async (id, e) => {
    const clientsDoc = doc(db, "clients", id);
    await deleteDoc(clientsDoc);
    console.log("the data has been deleted");
  };

  useEffect(() => {
    const getclients = async () => {
      const data = await getDocs(clientsRef);
      setclients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getclients();
  }, []);


  return (
    <div className="px-4 py-lg-4">
      <div className="title mb-5 mt-5 mt-lg-0">
        <h1>Clients</h1>
        <small className="text-muted">{getDate()}</small>
      </div>
      <div>
        <Input
          placeholder="Search Client"
          icon="search"
          style={{ width: "500px", margin: "10px" }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <Link to="/addClient">
          <button floated="" primary className="ui button">
            Add New
          </button>
        </Link>
      </div>

      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Full Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Adress</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {clients
            .filter((clients) => {
              return search.toLowerCase() === ""
                ? clients
                : clients.name.toLowerCase().includes(search);
            })
            .map((clients , index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{clients.name}</Table.Cell>
                  <Table.Cell>{clients.email}</Table.Cell>
                  <Table.Cell>{clients.phone}</Table.Cell>
                  <Table.Cell>{clients.adress}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {" "}
                        <Button
                          style={{ width: "50px" }}
                          class="edit"
                          inverted
                          icon="edit outline"
                          color="blue"
                          title="update"
                          onClick={()=>{
                            navigate(`/updateclient/${clients.id}`)
                          }}
                        ></Button>

                    <Button
                      style={{ width: "50px" }}
                      inverted
                      icon="user delete"
                      color="red"
                      title="Delete the Client"
                      onClick={() => {
                        deleteClient(clients.id, clients.email);
                      }}
                    ></Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ClientsContent;
