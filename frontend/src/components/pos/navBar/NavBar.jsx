import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { AiFillAppstore,  AiFillSetting, AiOutlineUser} from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { BsTruck , BsCartPlus}  from 'react-icons/bs';
import { CgLogOut } from 'react-icons/cg';
import { auth} from "../../../firebase-config";
import { signOut} from 'firebase/auth';
import "./navBar.css";

const NavBar = ({active}) => {
  const navigate = useNavigate();
  const logOut = async () => {
    try{
      await signOut(auth);
      navigate('/');
    }
    catch(err){
      console.error(err);
    }}

  return (
    <div className='navbar px-4 d-flex justify-content-between d-lg-none col-12'>
        <div className='col-2'><b></b></div>
          
        <div className='d-flex justify-content-start col-6'>
            <Link  to="/pos" style={{ color: "black" }}><div className={active === "pos"? "nav-items p-2 active":"nav-items p-2"} ><AiFillAppstore /></div></Link>
            <Link to="/stock" style={{ color: "black" }}><div className={active === "stock"? "nav-items p-2 active":"nav-items p-2"}><FiPackage /></div></Link>
            <Link to="/dashboard" style={{ color: "black" }}><div className={active === "dashboard"? "nav-items p-2 active":"nav-items p-2"}><BsCartPlus /></div></Link>
            <Link to="/clients" style={{ color: "black" }}><div className={active === "clients"? "nav-items p-2 active":"nav-items p-2"}>< AiOutlineUser /></div></Link>
            <Link to="/suppliers " style={{ color: "black" }}><div className={active === "suppliers"? "nav-items p-2 active":"nav-items p-2"}><BsTruck /></div></Link>
            <Link to="/settings" style={{ color: "black" }}><div className={active === "setting"? "nav-items p-2 active":"nav-items p-2"}><AiFillSetting /></div></Link>
        </div>

        <div className='d-flex col-2'>
            <Link onClick={logOut} to="/" style={{ color: "black" }}><div className="nav-items p-2"><CgLogOut /></div></Link>
        </div>


         
       

        
    
          
    </div>
  )
}

export default NavBar