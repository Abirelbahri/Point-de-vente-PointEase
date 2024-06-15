import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Table } from "semantic-ui-react";
import { Input, Button } from "semantic-ui-react";

const StockContent = () => {
  let myDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  const [search, setSearch] = useState("");
  const [OrderList  , setOrderList] = useState([]);
  const OrdersRef = collection(db, "orders");

  useEffect(() => {
    const getOrder = async () => {
      try {
      const data = await getDocs(OrdersRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setOrderList(filteredData);
      
    }catch(error){
      console.error(error);
    }
      
    };

    getOrder();
  }, []);

  const deleteOrder = async (id) => {
    const OredersDoc = doc(db, "orders", id);
    await deleteDoc(OredersDoc);
    console.log("the data has been deleted");
  };



  return (
    <div className="px-4 py-lg-4">
      <div className="title mb-5 mt-5 mt-lg-0">
        <h1>Orders</h1>
        <small className="text-muted">{myDate}</small>
      </div>
      <div>
        <Input
          style={{ width: "500px", margin: "10px" }}
          placeholder="Search Orders Here"
          icon="search"
          className="p-2"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <Table striped>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Cashier</Table.HeaderCell>
            <Table.HeaderCell>Client Name</Table.HeaderCell>
            <Table.HeaderCell>total Items</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Client Paid</Table.HeaderCell>
            <Table.HeaderCell>change</Table.HeaderCell>
          
            <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
         {OrderList.filter((order) => {
              return search.toLowerCase() === ""
                ? order
                : order.cashierName.toLowerCase().includes(search);
            }).map((order , index) => (
                <Table.Row key={index}>
                  <Table.Cell>{moment(order.timestamp.toDate()).format("DD-MM-YYYY HH:mm:ss")}</Table.Cell>
                  <Table.Cell>{order.cashierName}</Table.Cell>
                  <Table.Cell>{order.clientName}</Table.Cell>
                  <Table.Cell>{order.totalitems}</Table.Cell>
                  <Table.Cell>{order.total}</Table.Cell>
                  <Table.Cell>{order.paidAmount}</Table.Cell>
                  <Table.Cell>{order.change}</Table.Cell>
 
                  <Table.Cell textAlign="center">
                    <Button
                    style={{width : "50px" }}
                      inverted
                      icon="delete"
                      color="red"
                      title="Delete Order"
                      onClick={() => {
                        deleteOrder(order.id);
                      }}
                    >
                    </Button>
                    {/* <Button
                      style={{width : "50px" }}
                      icon="print"
                      inverted
                      color="blue"
                      title="print receipe"
                    >
                    </Button> */}

                  </Table.Cell>
                </Table.Row>
         )
            )} 
        </Table.Body>
      </Table>

    </div>
  );
};

export default StockContent;
