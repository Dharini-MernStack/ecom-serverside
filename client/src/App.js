import './App.css';
import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnavbaar/Newnav";
import Maincomp from './components/home/Maincomp';
import Footer from "./components/footer/Footer";
import Sign_in from "./components/signup_sign/Sign_in";
import Signup from "./components/signup_sign/Singnup";
import {Routes,Route} from "react-router-dom";
import Cart from "./components/cart/cart";
import Buynow from "./components/buynow/buynow";
import CircularProgress from '@mui/material/CircularProgress';
import { useState ,useEffect} from 'react';
function App() {

  const[data,setData]=useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setData(true)
    }, 3000);
  },[])
    return (
    <>
    {
      data ? (
        <>
<Navbar/>
    <Newnav/>
    <Routes>
      <Route path="/" element={<Maincomp/>} />
      <Route path="/login" element={<Sign_in/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/getproductsone/:id" element={<Cart/>} />
      <Route path="/buynow" element={<Buynow/>} />
    </Routes>

    <Footer/>

         </>
      ) :(
        <div className='circle'>
          <CircularProgress/>
          <h2>Loading ...</h2>

        </div>
      )
    }
    
    </>
  );
}

export default App;
