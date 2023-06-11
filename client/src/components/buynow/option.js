import React, { useContext } from 'react';
import "./buynow.css"
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const option = ({ deletedata, get }) => {
  const {account,setAccount}=useContext(LoginContext)
 
  const removedata = async (req, res) => {
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "apllication/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        console.log("error")
      } else {
        console.log("user deleted");
        setAccount(data);
        toast.success(" Item removed from cart 😃!",{
          position:"top-center",
         })
        get();
      }
    } catch (error) {
      console.log("error")
    }
  }
  return (
    <div className='add_remove_select'>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}><b>Delete</b></p><span> |</span>
      <p className='forremovemedia'><b>Save or Later</b></p><span> |</span>
      <p className='forremovemedia'><b>See More like this</b></p><span> |</span>
<ToastContainer/>
    </div>
    
  )
}

export default option
