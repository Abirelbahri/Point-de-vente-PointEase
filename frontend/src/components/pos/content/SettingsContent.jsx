import React, { useEffect, useState } from "react";
import getDate from "../../../utils/getDate";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Grid , Form } from 'semantic-ui-react'

const SettingsContent = () => {
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

  return (
    <div className="px-4 py-lg-4">
      <div className="title mb-5 mt-5 mt-lg-0">
        <h1>Settings</h1>
        <small className="text-muted">{getDate()}</small>
<br />
<br />
        <div style={{display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
          {authUser ? <p><b>{`Signed in as : ${authUser.email}`}</b></p>
                    : <p>signout</p>}
        </div>


      </div>
    </div>
  );
};

export default SettingsContent;
