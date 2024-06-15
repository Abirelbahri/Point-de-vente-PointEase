import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import {
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Header, Image, Table , Button , Input} from 'semantic-ui-react'
import getDate from "../../../utils/getDate";

const ProductsList = () => {
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProduct(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const deleteProduct = async (id, e) => {
    const ProductDoc = doc(db, "products", id);
    await deleteDoc(ProductDoc);
    console.log("the data has been deleted");
  };

  return (
    <div className="px-4 py-lg-4">
        <div className="title mb-5 mt-5 mt-lg-0">
        <h1>Products List</h1>
        <small className="text-muted">{getDate()}</small>
        </div>
        <div style={{alignItems: "center", display: "flex", justifyContent: "center"}} >
        <Input
          placeholder="Search Products"
          icon="search"
          style={{ width: "500px" }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        </div>

        <Table striped>
          <Table.Header>
            <Table.Row>
              
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Product Description</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Modifier</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Product && Product.filter((Product) => {
              return search.toLowerCase() === ""
                ? Product
                : Product.name.toLowerCase().includes(search);
            }).map((Products)=>(
            <Table.Row key={Products.id}>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src={Products.img}
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    {Products.name}
                    <Header.Subheader>{Products.category}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{Products.description}</Table.Cell>
              <Table.Cell>{Products.price}</Table.Cell>
              <Table.Cell>{Products.numberInStock}</Table.Cell>
              <Table.Cell textAlign="center">
                    {" "}
                    <Button
                      style={{ width: "50px" }}
                      inverted
                      icon="edit outline"
                      color="blue"
                      title="update"
                      onClick={()=>{
                        navigate(`/updateproduct/${Products.id}`)
                      }}
                    ></Button>
                    <Button
                      style={{ width: "50px" }}
                      inverted
                      icon="delete"
                      color="red"
                      title="Delete"
                      onClick={() => {
                        deleteProduct(Products.id, Products.email);
                      }}
                    ></Button>


                  </Table.Cell>
            </Table.Row>
            ))}
          </Table.Body>

        </Table>
      </div>
    
  );
};

export default ProductsList;
