import React from 'react'

import { NavBar, SideBar, DashboardContent } from '../../components/pos';

import "../posApp.scss";

const Dashboard = () => {
  return (
    <div className='posApp2'>
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"dashboard"}/>
          </div>
          <div className="col">
              <DashboardContent />
          </div>
      </div>
    </div>
  )
}

export default Dashboard