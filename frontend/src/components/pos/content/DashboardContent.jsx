import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Button, Grid, Loader, Form, Icon } from "semantic-ui-react";
const initialState = {
  name: "",
  description: "",
  price: "",
  category: "",
  numberInStock: "",
};

const DashboardContent = () => {
  const [Product, setProduct] = useState(initialState);
  const { name, price, category, description, numberInStock } = Product;
  const [progress, setProgress] = useState(null);
  const [file, setFile] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const productRef = collection(db, "products");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    id && getSingleUser();
  }, [id]);

  const getSingleUser = async() => {
    const updateRef = doc(db, "products" , id);
    const snapshot = await getDoc(updateRef);
    if(snapshot.exists()){
      setProduct({...snapshot.data()});
    }
  }



  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is Paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct((prev) => ({
              ...prev,
              img: downloadURL,
            }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productRef);
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (!numberInStock) {
      errors.numberInStock = "Number in stock is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).lenght) return setErrors(errors);
    setIsSubmit(true);
    if(!id){
      try{
        await addDoc(productRef, { ...Product, timestamp: serverTimestamp() });
        navigate("/pos");
      }catch(error){
        console.log(error);
      }
    }
    else{
      try{
        await updateDoc(doc(db, "products",id), { ...Product, timestamp: serverTimestamp() });
        navigate("/productlist");
      }catch(error){
        console.log(error);
      }
    }


  };

  return (
    <div>
      <br />
      <br />
      <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{ height: "80vh", margin: "20px" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              <h2>{id ? "Update Product" : "Add Product"}</h2>
              <br />
              {isSubmit ? (
                <Loader active inline="centered" size="huge" />
              ) : (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Form.Input
                      type="text"
                      name="name"
                     placeholder="Enter Name"                 
                      onChange={handleChange}
                      value={name}
                      error={errors.name ? { content: errors.name } : null}
                      autoFocus
                    />
                    <Form.Input
                      type="number"
                      name="price"
                      placeholder="Enter Product Price"
                      onChange={handleChange}
                      value={price}
                      error={errors.price ? { content: errors.price } : null}
                    />
                    <Form.TextArea
                      type="text"
                      name="description"
                      placeholder="Enter Product Description"
                      onChange={handleChange}
                      value={description}
                      error={
                        errors.description
                          ? { content: errors.description }
                          : null
                      }
                    />
                    <Form.Input
                      type="text"
                      name="category"
                      placeholder="Enter Product Category"
                      onChange={handleChange}
                      value={category}
                      error={
                        errors.category ? { content: errors.category } : null
                      }
                    />
                    <Form.Input
                      type="number"
                      name="numberInStock"
                      placeholder="Enter Product Stock"
                      onChange={handleChange}
                      value={numberInStock}
                      error={
                        errors.numberInStock
                          ? { content: errors.numberInStock }
                          : null
                      }
                    />
                    <Form.Input
                      type="file"
                      label="Upload Image"
                      name="image"
                      onChange={(event) => setFile(event.target.files[0])}
                    />
                    <Button
                      primary
                      type="submit"
                      disabled={progress !== null && progress < 100}
                    >
                      Submit
                    </Button>
                  </Form>
                </>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Link to="/ProductList">
        <Button
          floated="right"
          icon
          labelPosition="right"
          style={{ width: "200px" }}
        >
          View Products List
          <Icon name="right arrow" />
        </Button>
      </Link>
    </div>
  );
};

export default DashboardContent;

// <Grid.Row>
// <Grid.Column>
//   <Table striped>
//     <Table.Header>
//       <Table.Row>
//       <Table.HeaderCell>Image</Table.HeaderCell>
//         <Table.HeaderCell>ProductName</Table.HeaderCell>
//         <Table.HeaderCell>Price</Table.HeaderCell>
//         <Table.HeaderCell>Category</Table.HeaderCell>
//         <Table.HeaderCell>Stock</Table.HeaderCell>
//         <Table.HeaderCell textAlign="center">
//           Actions
//         </Table.HeaderCell>
//       </Table.Row>
//     </Table.Header>

//     <Table.Body>
//       {Product.map((products) => {
//   return (
//             <Table.Row>

//               <Table.Cell>{products.name}</Table.Cell>
//               <Table.Cell>{products.price}</Table.Cell>
//               <Table.Cell>{products.category}</Table.Cell>
//               <Table.Cell>{products.numberInStock}</Table.Cell>
//               <Table.Cell textAlign="center">
//                 {" "}
//                 <Button
//                   style={{ width: "50px" }}
//                   class="edit"
//                   color="blue"
//                   // title="Edit the Client"
//                   // onClick={handleShow2}
//                 >
//                   <FiEdit2 />
//                 </Button>
//                 <Button
//                   style={{ width: "50px" }}
//                   inverted
//                   color="red"
//                   // title="Delete the Client"
//                   // // onClick={() => {
//                   // //   deleteClient(clients.id, clients.email);
//                   // // }}
//                 >
//                   <FiTrash />
//                 </Button>
//                 <Button
//                   style={{ width: "50px" }}
//                   inverted
//                   color="blue"
//                   // title="Delete the Client"
//                   // onClick={refreshPage}
//                 >
//                   <FiRefreshCw />
//                 </Button>
//               </Table.Cell>
//             </Table.Row>
//           );
//         })}
//     </Table.Body>
//   </Table>
// </Grid.Column>
// </Grid.Row>
