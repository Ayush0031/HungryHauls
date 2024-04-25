import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""})
    
    let style={
            
        backgroundColor: "#6e60dd"
}
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })
        const json= await response.json();
        console.log(json);
        if(!json.success){
            alert("Please enter valid Credentials")
        }
        setCredentials({name:"",email:"",password:"",geolocation:""})
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
        <div className='container sm'>
            <form onSubmit={handleSubmit}>
            
                <img className="responsive center" src='./logo_hh.png' height={200} />
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Location</label>
                    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange}/>
                    
                </div>
                
                <button type="submit" style={style} className="m-3 btn btn-primary">Submit</button>
                <Link to='/login' className='m-3' style={{color:"white"}}>Already Have Account</Link>
            </form>
        </div>
        </>
    )
}

export default Signup
