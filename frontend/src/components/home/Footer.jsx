import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
  <Container fluid className="footer">
    <h1 className="footer__logo">PointEase</h1>
      <div className="footer">
        <div className="footer__addr">  
          <h2>Adresse : </h2> 
        
          380 Av<br/>
          Mohamed V B. N°2<br/>
          Kénitra<br/>
            Morocco         <br/>                                                        
              
            <Link className="footer__btn" href="elbahri.fst@uhp.ac.ma">Email Us</Link>
            <ul className="footer-icons">
            <li className="social-icons">
              <Link
                href="https://twitter.com"
                style={{ color: "black" }} 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </Link>
            </li>
            <li className="social-icons">
              <Link
                href="https://www.linkedin.com"
                style={{ color: "black" }} 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </Link>
            </li>
            <li className="social-icons">
              <Link
                href="https://www.instagram.com"
                style={{ color: "black" }} 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </Link>
            </li>
            <li className="social-icons">
              <Link
                href="https://github.com"
                style={{ color: "black" }} 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </Link>
            </li>
          </ul>
        </div>
        
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Pricing</h2>
      
            <ul className="nav__ul">
              <li>
                <Link href="#">Need help</Link>
              </li>
      
              <li>
                <Link href="#">Cancel Request</Link>
              </li>
                  
              <li>
                <Link href="#">Browse Options</Link>
              </li>
            </ul>
          </li>
          
          <li className="nav__item nav__item--extra">
            <h2 className="nav__title">Support</h2>
            
            <ul className="nav__ul nav__ul--extra">
              <li>
                <Link href="#">Feedback</Link>
              </li>
              
              <li>
                <Link href="#">FAQ</Link>
              </li>
              
              <li>
                <Link href="#">Knowledge Base</Link>
              </li>
              
              <li>
                <Link href="#">Community</Link>
              </li>
              
            </ul>
          </li>
          
          <li className="nav__item">
            <h2 className="nav__title">Legal</h2>
            
            <ul className="nav__ul">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              
              <li>
                <Link href="#">Terms of Use</Link>
              </li>
              
              <li>
                <Link href="#">Sitemap</Link>
              </li>
            </ul>
          </li>
        </ul>

          <div className="legal">
            <h6>Copyright © {year}.All rights reserved.</h6>
          <div className="legal__links">
            <span>Made by  <span className="heart">Elbahri Abir</span></span>
          </div>
      </div>
    </div>
  </Container>
  );
}

export default Footer;
