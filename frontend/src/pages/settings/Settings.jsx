import React from 'react';

import { NavBar, SideBar, SettingsContent } from '../../components/pos';

import "../posApp.scss";

const Settings = () => {
  return (
    <div className='posApp2'>
      <NavBar />
      <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div className="col-md-1 text-lg-center d-none d-lg-block">
              <SideBar active={"settings"}/>
          </div>
          <div className="col">
              <SettingsContent />
          </div>
      </div>
    </div>
  )
}

export default Settings