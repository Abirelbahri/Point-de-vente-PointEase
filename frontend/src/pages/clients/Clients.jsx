import React from 'react'

import { NavBar, SideBar, ClientsContent } from '../../components/pos';

import "../posApp.scss";

const Clients = () => {
  return (
    <div className='posApp2'>
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"clients"}/>
          </div>
          <div className="col">
              <ClientsContent />
          </div>
      </div>
    </div>
  )
}

export default Clients