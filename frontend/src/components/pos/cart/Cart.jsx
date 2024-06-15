import { ProductContext } from "../../../context/ProductsContext";
import React, { useState, useRef, useContext, useEffect } from "react";
import moment from "moment";
import creditcard from "../../../assets/pos/creditcard.svg";
import "./cart.css";
import { useReactToPrint } from "react-to-print";
import {
  Header,
  Icon,
  Modal,
  Form,
  Tab,
  Button,
  Loader,
} from "semantic-ui-react";
import Calculator from "./calculator.jsx";
import { db } from "../../../firebase-config";
import {
  addDoc,
  getDocs,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Cart = ({ order, setOrder }) => {
  const [open, setOpen] = React.useState(false);
  const { products, updateProduct } = useContext(ProductContext);
  const [change, setChange] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newCashier, setNewCashier] = useState("");
  const [newTotalItems, setnewTotalItems] = useState("");
  const [newTotal, setnewTotal] = useState("");
  const OrdersRef = collection(db, "orders");
  const [isSubmit, setIsSubmit] = useState(false);
  const [clients, setclients] = useState([]);
  const clientsRef = collection(db, "clients");

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  const handleCalculate = () => {
    const total = order.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.count;
    }, 0);

    const paidAmount = parseFloat(inputValue);

    const calculatedChange = (paidAmount - total).toFixed(2);

    setChange(calculatedChange);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const cancelOrder = () => {
    let i, j;
    for (i = 0; i < products.length; i++)
      for (j = 0; j < order.length; j++)
        if (products[i].id === order[j].id) {
          let product = products[i];
          product.numberInStock += order[j].count;
          updateProduct(product);
        }
    setOrder([]);
  };

  const incrementHandle = (item) => {
    let product = [];
    products.map((p) => (p.id === item.id ? (product = p) : null));
    console.log(product.numberInStock);
    let newOrder = [...order];
    const index = newOrder.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      newOrder[index].count++;
      newOrder[index].numberInStock--;
    }
    setOrder(newOrder);
  };

  const decrementHandle = (item) => {
    let product = [];
    products.map((p) => (p.id === item.id ? (product = p) : null));
    console.log(product.numberInStock);
    let newOrder = [...order];
    const index = newOrder.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      newOrder[index].numberInStock++;
      if (newOrder[index].count > 1) {
        newOrder[index].count--;
      } else {
        newOrder.splice(index, 1);
      }
    }
    setOrder(newOrder);
  };

  useEffect(() => {
    const getclients = async () => {
      const data = await getDocs(clientsRef);
      setclients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getclients();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  let myDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

  const componentPdf = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "Recipe",
    onAfterPrint: () => alert("Your Recipe has been successfully printed."),
  });

  const OnSubmit = async () => {
    try {
      await addDoc(OrdersRef, {
        clientName: newClient,
        cashierName: authUser.email,
        totalitems: order.reduce((totalPrice, item) => {
          return totalPrice + item.count;
        }, 0),
        total: order
          .reduce((totalPrice, item) => {
            return totalPrice + item.price * item.count;
          }, 0)
          .toFixed(2),
        paidAmount: inputValue,
        change: change,
        timestamp: serverTimestamp(),
      });
      setIsSubmit(true);
    } catch (err) {
      console.error(err);
    }
  };

  const panes = [
    {
      menuItem: "Cash",
      render: () => (
        <Tab.Pane attached={false}>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                {" "}
                {isSubmit ? (
                  <Loader active inline="centered" size="huge" />
                ) : (
                  <>
                    <Form unstackable>
                      <Form.Group widths={2}>
                        <Form.Input
                          label="Cashier"
                          placeholder="Cashier"
                          value={authUser.email}
                          onChange={(e) => setNewCashier(e.target.value)}
                        />
                        <Form.Input
                          type="text"
                          label="Client Name"
                          placeholder="Client Name"
                          onChange={(e) => setNewClient(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group widths={2}>
                        <Form.Input
                          type="number"
                          htmlFor="total-input"
                          label="Total Items"
                          value={order.reduce((totalPrice, item) => {
                            return totalPrice + item.count;
                          }, 0)}
                          onChange={(e) => setnewTotalItems(e.target.value)}
                          readOnly
                        />
                        <Form.Input
                          label="Total $"
                          type="number"
                          value={order
                            .reduce((totalPrice, item) => {
                              return totalPrice + item.price * item.count;
                            }, 0)
                            .toFixed(2)}
                          onChange={(e) => setnewTotal(e.target.value)}
                          readOnly
                        />
                      </Form.Group>
                      <Form.Group widths={2}>
                        <Form.Input
                          htmlFor="paid-amount-input"
                          id="paid-amount-input"
                          label="Paid Amount"
                          type="number"
                          value={inputValue}
                          readOnly
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Form.Input
                          htmlFor="change-input"
                          label="Change"
                          id="change-input"
                          type="number"
                          value={change}
                          onChange={(e) => setChange(e.target.value)}
                          readOnly
                        />
                      </Form.Group>

                      <Button
                        onClick={OnSubmit}
                        primary
                        style={{ width: "150px" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </>
                )}
                <br />
                <Calculator onInputChange={handleInputChange} />
                <Button
                  style={{ width: "500px" }}
                  value={inputValue}
                  onClick={handleCalculate}
                  color="green"
                >
                  Calculate Change
                </Button>
              </div>
              <div className="col-sm-5" ref={componentPdf}>
                {order.map((item, index) => (
                  <div key={index} className="item d-flex " >
                    <img
                      className="col-1"
                      draggable="false"
                      src={item.img}
                      alt={item.name}
                    />
                    <div className="details d-flex flex-column px-1 col-6">
                      <small className="categorie">
                        <span style={{ fontSize: "10px", color: "black" }}>
                          Category:{" "}
                        </span>
                        <span style={{ fontSize: "12px", color: "grey" }}>
                          {item.category}
                        </span>
                      </small>
                      <small
                        className="title"
                        style={{ fontSize: "12px", color: "" }}
                      >
                        {item.name}
                      </small>
                    </div>
                    <div className="counter d-flex align-items-center text-center col">
                      <span className="itemCount mx-2">
                        ${item.price} × {item.count ? item.count : "1"}
                      </span>
                    </div>
                  </div>
                ))}

                <hr />
                <div className="item d-flex">
                  <div className="details d-flex flex-column px-1 col-6">
                    <h6>Total Items</h6>
                  </div>
                  <div className="counter d-flex align-items-center text-center col">
                    <span className="itemCount mx-5">
                      {order.reduce((totalPrice, item) => {
                        return totalPrice + item.count;
                      }, 0)}
                    </span>
                  </div>
                </div>
                <div className="item d-flex">
                  <div className="details d-flex flex-column px-1 col-6">
                    <h6>Sub Total</h6>
                  </div>
                  <div className="counter d-flex align-items-center text-center col">
                    <span className="itemCount mx-5">
                      $
                      {order
                        .reduce((totalPrice, item) => {
                          return totalPrice + item.price * item.count;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Card",
      render: () => (
        <Tab.Pane attached={false}>
          <h5>Payment by Card machine</h5>
          <img src={creditcard} alt="Credit Card" />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="cart d-flex flex-column justify-content-between p-5 p-lg-3">
      <div className="d-flex flex-column p-1" style={{ overflowY: "hidden" }}>
        <h4 className="cart-title">Order</h4>
        <hr />
        <br />
        <div className="cart-products p-1">
          {order.map((item, index) => (
            <div key={index} className="item d-flex">
              <img
                className="col-1"
                draggable="false"
                src={item.img}
                alt={item.name}
              />
              <div className="details d-flex flex-column px-1 col-6">
                <small className="categorie">
                  <span style={{ fontSize: "10px", color: "black" }}>
                    Category:{" "}
                  </span>
                  <span style={{ fontSize: "12px", color: "grey" }}>
                    {item.category}
                  </span>
                </small>
                <small
                  className="title"
                  style={{ fontSize: "12px", color: "" }}
                >
                  {item.name}
                </small>
                <span
                  className="badge text-bg-secondary"
                  style={{ width: "60px" }}
                >
                  ${item.price}
                </span>
              </div>
              <div className="counter d-flex align-items-center text-center col">
                <button
                  className="setCount decrement"
                  onClick={() => decrementHandle(item)}
                >
                  -
                </button>
                <span className="itemCount mx-2">
                  {item.count ? item.count : "1"}
                </span>
                <button
                  className="setCount increment"
                  disabled={item.numberInStock > 0 ? false : true}
                  onClick={() => incrementHandle(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column p-1">
        <hr />
        <div className="totalItems d-flex justify-content-between p-1">
          <h6>Total Items:</h6>
          <h6 className="countItems" style={{ textAlign: "right" }}>
            {order.reduce((totalPrice, item) => {
              return totalPrice + item.count;
            }, 0)}
          </h6>
        </div>
        <div className="total d-flex justify-content-between p-1">
          <h5>Total:</h5>
          <h5 className="totalPrice" style={{ textAlign: "right" }}>
            $
            {order
              .reduce((totalPrice, item) => {
                return totalPrice + item.price * item.count;
              }, 0)
              .toFixed(2)}
          </h5>
        </div>
        <hr />

        <br />
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="large"
          trigger={
            <Button style={{ margin: "2px" }} color="blue">
              Pay Now
            </Button>
          }
        >
          <Modal.Header>Check Out</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Payment Method</Header>
              <Tab menu={{ secondary: true }} panes={panes} />
              <br />
              <small className="text-muted">{myDate}</small>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" inverted onClick={generatePDF}>
              <Icon name="print" />
              Print
            </Button>
            <Button
              color="green"
              inverted
              style={{ width: "160px" }}
              onClick={refreshPage}
            >
              Next Customer
              <Icon name="long arrow alternate right" />
            </Button>
          </Modal.Actions>
        </Modal>

        <Button
          type="button"
          style={{ margin: "2px" }}
          color="white"
          disabled={order.length < 1 && true}
          onClick={cancelOrder}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Cart;
// disabled={order.length < 1 && true}
