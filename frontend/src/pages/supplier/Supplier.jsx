import React from 'react'

import { NavBar, SideBar, SuppliersContent } from '../../components/pos';

import "../posApp.scss";

const Supplier = () => {
  return (
    <div className='posApp2'>
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"suppliers"}/>
          </div>
          <div className="col">
              <SuppliersContent />
          </div>
      </div>
    </div>
  )
}

export default Supplier