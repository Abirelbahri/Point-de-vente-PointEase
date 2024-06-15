import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "./market.css";
import { db, storage } from "../../../firebase-config";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import addfile from "../../../assets/pos/addfile.svg";
import { Button, Input } from "semantic-ui-react";


const Market = ({ order, setOrder }) => {
  //firebase bullshit

  const [Product, setProduct] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [filter, setFilter] = useState([]);
  const productRef = collection(db, "products");
  const [search, setSearch] = useState("");
  

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productRef);
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  useEffect(() => {
    let filterCat = Product.map((p) => {
      return p.category;
    });
    filterCat = filterCat.filter((c, index) => {
      return filterCat.indexOf(c) === index;
    });
    setFilter(filterCat);
  }, [Product]);

  const handleSelect = (cat) => {
    setSelectedCat(cat);
  };

  const handleOrder = (product) => {
    let newOrder = [...order];
    const index = newOrder.findIndex((i) => i.id === product.id);
    if (index !== -1) {
      product.numberInStock--;
      newOrder[index].count++;
    } else {
      product.numberInStock--;
      product.count = 1;
      newOrder.push(product);
    }
    console.log(newOrder);
    setOrder(newOrder);
  };

  let myDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="px-4 py-lg-4">
      <div className="title mb-3 mt-5 mt-lg-0">
        <h1>Making Orders</h1>
        <small className="text-muted">{myDate}</small>
        
        </div>
        
       {" "}
        <Input
        placeholder="Search Product Here"
        icon="search"
        className="p-2"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
     
  
      <div className="categories d-flex flex-wrap mb-5">
        <div className="categories-items m-2">
          <Button
            type="button"
            className={selectedCat === "All" ? "blue" : "white"}
            onClick={() => handleSelect("All")}
          >
            All
          </Button>
        </div>
        {filter.map((f, i) => (
          <div key={i} className="categories-items m-2">
            <Button
              type="button"
              color={selectedCat === f ? "blue" : "white"}
              onClick={() => handleSelect(f)}
            >
              {f}
            </Button>
          </div>
        ))}{" "}
 
      </div>
      <div className="products">
        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5  g-4 mx-2">
          {Product.filter((products) => {
            return search.toLowerCase() === ""
              ? products
              : products.name.toLowerCase().includes(search);
          }).map((products, index) => {
            return (
              <>
                {(products.category === selectedCat ||
                  selectedCat === "All") && (
                  <div className="col p-2" key={index}>
                    <div className="card">
                      <img
                        draggable="false"
                        src={products.img}
                        className="card-img-top"
                        title={products.description}
                        alt={products.name}
                      />
                      <div className="card-body" >
                        <div className="d-flex justify-content-between">
                          <p className="card-title fw-semibold col">
                            {products.name}
                          </p>
                          <p
                            className="card-title fw-semibold col-4 col-xxl-4"
                            style={{ textAlign: "right" }}
                          >
                            ${products.price}
                          </p>
                        </div>
                        {products.numberInStock > 0 ? (
                          <Button
                            basic
                            type="button"
                            color="blue"
                            onClick={() => handleOrder(products)}
                          >
                            Add to cart
                          </Button>
                        ) : (
                          <Button type="button" color="white" disabled>
                            Out of stock
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Market;
