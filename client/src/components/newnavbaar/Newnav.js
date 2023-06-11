import React from 'react';
import "./newnav.css";

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>All</p>
                <p>Mobiles</p>
                <p>Bestseller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Prime</p>
                <p>Today's deal</p>
                <p>Amazon Pay</p>
            </div>
            <div className='right_data'>
                <img src="./nav.jpg" alt="nav_data"/>
                
                </div>
           
        </div>
      
    </div>
  )
};

export default Newnav;
