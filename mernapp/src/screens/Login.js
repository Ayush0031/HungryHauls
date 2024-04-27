import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'


const Login = () => {
  let navigate=useNavigate()
  const[credentials,setCredentials]=useState({email:"",password:""})
    
    let style={
            
        backgroundColor: "#6e60dd"
}
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json= await response.json();
        console.log(json);
        if(!json.success){
            alert("Please enter valid Credentials")
        }
        if(json.success){
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem("authToken",json.authToken)
            console.log(localStorage.getItem())
          navigate("/")
      }
        setCredentials({email:"",password:""})
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
        <div className='container sm'>
            <form onSubmit={handleSubmit}>
            
                <img className="responsive center" alt=" "src='./logo_hh.png' height={200} />
                
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                
                
                <button type="submit" style={style} className="m-3 btn btn-primary">Submit</button>
                <Link to='/signup' className='m-3' style={{color:"white"}}>Don't Have Account</Link>
            </form>
        </div>
        </>
  )
}

export default Login
