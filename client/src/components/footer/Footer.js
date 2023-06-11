import React from 'react';
import "./footer.css";

const Footer = () => {

  const year = new Date().getFullYear();
 
  return (
    <footer>
         <div className='footer_container'>
         <div className='footer_details_one'>
      <h3>Get to Know Us</h3>
      <p>About us</p>
      <p>Careers</p>
      <p>Press Release</p>
      <p>Amazon cares</p>
      </div>
      
      <div className='footer_details_one'>
      <h3>Connect with us</h3>
      <p>Facebook</p>
      <p>Twitter</p>
      <p>Instagram</p>
      
      </div>

      <div className='footer_details_one forres'>
      <h3>Make Money with us</h3>
      <p>Sell on Amazon</p>
      <p>Sell under Amazon Accelerator</p>
      <p>Protect and build your brand</p>
      
      </div>

      <div className='footer_details_one forres'>
      <h3>Let us Help You</h3>
      <p>Covid-19 and Amazon</p>
      <p>Your Account</p>
      <p>Returns Centre</p>
      
      </div>
      </div>

      <div className='lastdetails'>
        <img src="./amazon_PNG25.png" alt=""/>
        <p>Conditions of Use & Sale &nbsp;&nbsp; Privacy Notice &nbsp;&nbsp; Interest-Based Ads &nbsp;  © 1996-{year}, &nbsp; Amazon.com, &nbsp; Inc. or its affiliates   </p>
      </div>

    </footer>
   
  )
}

export default Footer
