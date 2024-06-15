import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductsContext';
import { Home, Pos, Login , Signup, Stock, Dashboard, Settings, NotFound ,AddClient, Clients,Suppliers, AddSuppliers, ProductList } from './pages';
import { NavBar, ScrollToTop, Footer } from './components/home';
import "./app.scss";




const currentUser = true;
const RequireAuth = ({children}) => {
  return currentUser ? (children): <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div className="App">
        <NavBar />
        <ScrollToTop />
          <Home />
        <Footer />
      </div>,
    errorElement: <NotFound />
  },
  {
    path: "/pos",
    element: <RequireAuth><ProductProvider><Pos /></ProductProvider></RequireAuth>,
  },
  {
    path: "/stock",
    element: <RequireAuth><Stock /></RequireAuth>,
  },
  {
    path: "/clients",
    element: <RequireAuth><Clients /></RequireAuth>,
  },
  {
    path: "/addClient",
    element: <RequireAuth><AddClient /></RequireAuth>,
  },
  {
    path: "/updateclient/:id",
    element: <RequireAuth><AddClient /></RequireAuth>,
  },
  {
    path: "/dashboard",
    element: <RequireAuth><Dashboard /></RequireAuth>,
  },
  {
    path: "/productlist",
    element: <RequireAuth><ProductList /></RequireAuth>,
  },
  {
    path: "/updateproduct/:id",
    element: <RequireAuth><Dashboard /></RequireAuth>,
  },
  {
    path: "/suppliers",
    element: <RequireAuth><Suppliers /></RequireAuth>,
  },
  {
    path: "/addSuppliers",
    element: <RequireAuth><AddSuppliers /></RequireAuth>,
  },
  {
    path: "/updatesuppliers/:id",
    element: <RequireAuth><AddSuppliers /></RequireAuth>,
  },
  {
    path: "/settings",
    element: <RequireAuth><Settings /></RequireAuth>,
  },
  {
    path: "/login",
    element: 
    <div className="App">
        <NavBar />
        <ScrollToTop />
      <Login />
      <Footer />
    </div>,
    errorElement: <NotFound />
  },
  {
    path: "/Signup",
    element: 
    <div className="App">
        <NavBar />
        <ScrollToTop />
      <Signup />
      <Footer />
    </div>,
    errorElement: <NotFound />
  },
  
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App