import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
const [udata,setUData]=useState({
  fname:"",
  email:"",
  number:"",
  password:"",
  passwordagain:""

})
//console.log(udata)
const adddata=(e)=>{
  const{name,value}=e.target;
  setUData(()=>{
    return {
      ...udata,
      [name]:value
    }
  })

}
const senddata = async(e)=>{
  e.preventDefault();
  const {fname,email,number,password,passwordagain}=udata;
  const res=await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      fname,email,number,password,passwordagain
    })
  });
  const data = await res.json();
  //console.log(data);

  if(res.status === 422 || !data){
  //alert("NO DATA")
  toast.warn("Invalid Registration 👎!",{
    position:"top-center",
   })
  }else{
   // alert("DATA SUCESSFULLY ADDED")
   toast.success("Data Sucessfully Registered 😃!",{
    position:"top-center",
   })
    setUData({...udata,fname:"",email:"",number:"",password:"",passwordagain:""});  }
}

  return (
    <>
     <section>
      <div className='sign_container'>
        <div className='sign_header'>
          <img src="./blacklogoamazon.png" alt="amaznlogo" />
        </div>
        <div className='sign_form'>
          <form method='POST'>
            <h1>Sign-Up</h1>
            <div className='form_data'>
              <label htmlFor='fname'>Your Name</label>
              <input type="text" 
              onChange={adddata}
              value={udata.fname}
              name="fname" id="fname"/>
            </div>

            <div className='form_data'>
              <label htmlFor='email'>Email</label>
              <input type="text" 
              onChange={adddata}
              value={udata.email}
              name="email" id="email"/>
            </div>

            <div className='form_data'>
              <label htmlFor='number'>Mobile No</label>
              <input type="number" 
              onChange={adddata}
              value={udata.number}
              name="number" id="number"/>
            </div>

            <div className='form_data'>
              <label htmlFor='password'>Password</label>
              <input type="password"
              onChange={adddata}
              value={udata.password}
              name="password" placeholder="Atleast 6 characters" id="password"/>
            </div>
            <div className='form_data'>
              <label htmlFor='passwordagain'>Confirm Password</label>
              <input type="password"
              onChange={adddata}
               value={udata.passwordagain}
                name="passwordagain"  id="passwordagain"/>
            </div>
            <button className='signin_btn' onClick={senddata}>Continue</button>
            <div className='signin_info'>
              <p>Already have an acoount ?</p>
             <NavLink to ="/login">Sign-In</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
    </>
  )
}

export default Signup
