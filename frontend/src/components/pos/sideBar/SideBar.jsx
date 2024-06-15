import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillAppstore, AiOutlineUser, AiFillSetting } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { CgLogOut } from 'react-icons/cg';
import { auth} from "../../../firebase-config";
import { signOut} from 'firebase/auth';
import "./sidebar.css";
import { BsTruck , BsCartPlus}  from 'react-icons/bs';


const SideBar = ({active}) => {

  const navigate = useNavigate();
  const logOut = async () => {
    try{
      await signOut(auth);
      navigate('/');
    }
    catch(err){
      console.error(err);
    }
  
  };
  return (
    <>
      <div className="d-flex flex-lg-column justify-content-between sidebar py-3">
        <div className="d-flex flex-lg-column justify-content-around">
          <div className='mb-lg-5'><b></b></div>
          
          <div>
            <Link to="/pos" style={{ color: "black" }}><div className={active === "pos"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}><AiFillAppstore /></div></Link>
            <Link to="/stock" style={{ color: "black" }}><div className={active === "stock"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}><FiPackage /></div></Link>
            <Link to="/dashboard" style={{ color: "black" }}><div className={active === "dashboard"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}><BsCartPlus /></div></Link>
            <Link to="/clients" style={{ color: "black" }}><div className={active === "clients"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}>< AiOutlineUser /></div></Link>
            <Link to="/suppliers" style={{ color: "black" }}><div className={active === "suppliers"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}><BsTruck /></div></Link>

          </div>
        </div>

        <div>
          <Link to="/settings" style={{ color: "black" }}><div className={active === "settings"? "sidebar-items my-2 p-2 active":"sidebar-items my-2 p-2"}><AiFillSetting /></div></Link>
          <Link onClick={logOut} style={{ color: "black" }}><div className="sidebar-items my-2 p-2"><CgLogOut /></div></Link>
        </div>
      </div>
    </>
  )
}

export default SideBar