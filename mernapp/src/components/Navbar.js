import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  let style={
            
            backgroundColor: "#6e60dd"
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
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
