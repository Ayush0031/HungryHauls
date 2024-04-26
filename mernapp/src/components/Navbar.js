import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { PiShoppingCartLight } from "react-icons/pi";
import { RiLogoutCircleRFill } from "react-icons/ri";
export default function Navbar() {
  let style={
            
            backgroundColor: "#6e60dd"
  }
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
      navigate("/")
  }
  return (
    <div>
      
     <nav className="navbar navbar-expand-lg navbar-dark" style={style}>
    
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">HungryHauls</Link>
    <img src='./logo_wt.png' alt="logo" height={100}/>
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="btn fs-3" aria-current="page" to="/">Home</Link>
        </li>
        {
          (localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="btn fs-3" aria-current="page" to="/">MyOrders</Link>
        </li>:""
        }
        
        
      </ul>
     
        {
          !(localStorage.getItem("authToken"))?
          <div className='d-flex'>
          <Link className="btn mx-1  fs-5" to="/login">Login</Link>
          <Link className="btn mx-1  fs-5" to="/signup">Sign-up</Link>
          </div>
          :
          <div>
          <div className='btn fs-2  mx-2'><PiShoppingCartLight /></div>
          <div className='btn mx-2 fs-5' onClick={handleLogout}> Logout <RiLogoutCircleRFill /></div>
          </div>
        }
         
      
    </div>
  </div>
</nav>
    </div>
  )
}
