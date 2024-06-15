import React from 'react';

import { NavBar, SideBar, StockContent } from '../../components/pos';

import "../posApp.scss";

const Stock = () => {
  return (
    <div className='posApp2'>
      <NavBar/>
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"stock"}/>
              
          </div>
          <div className="col">
              <StockContent />
          </div>
      </div>
    </div>
  )
}

export default Stock