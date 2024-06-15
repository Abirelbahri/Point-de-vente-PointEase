import React from 'react'

import { NavBar, SideBar, ProductsListContent } from '../../components/pos';

import "../posApp.scss";

const ProductList = () => {
  return (
    <div className='posApp2'>
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"dashboard"}/>
          </div>
          <div className="col">
              <ProductsListContent />
          </div>
      </div>
    </div>
  )
}

export default ProductList