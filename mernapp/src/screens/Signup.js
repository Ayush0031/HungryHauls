import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { IoLocation } from "react-icons/io5";
const Signup = () => {
    let navigate=useNavigate()
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",geolocation:""})
    
//     let style={
            
//         backgroundColor: "#6e60dd"
// }
let [address, setAddress] = useState("");


  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }
  
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/createuser",{
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
        else{
            navigate('/login')
        }
        setCredentials({name:"",email:"",password:"",geolocation:""})
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <Navbar/>
        <div style={{backgroundImage:'url("https://img.freepik.com/free-photo/elevated-view-burrito-wrap-salad-hamburger-green-background_23-2148165563.jpg?w=826&t=st=1705329032~exp=1705329632~hmac=1f040e743a1cc72db4d6cd85f0b7dbebfe48f1fd6923c88a9236427a97c7dcc9")', height: '100vh', backgroundSize: 'cover' }}>
            
        <div className='container sm'>
            <form className='w-50 m-auto transparent border-success rounded' onSubmit={handleSubmit}>
            
                <img className=" mx-auto d-block " alt="" src='./logo_hh.png' height={165} />
                
                <div className="mb-3">
                    <label htmlFor="name"  style={{fontWeight:"bold"}} className="form-label text-dark fst-italic">Name</label>
                    <input type="text" style={{ backgroundColor: 'transparent' }} className="form-control text-dark" name="name" value={credentials.name} onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1"  style={{fontWeight:"bold"}} className="form-label text-dark fst-italic">Email address</label>
                    <input type="email"  style={{ backgroundColor: 'transparent' }} className="form-control text-dark" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1"  style={{fontWeight:"bold"}} className="form-label text-dark fst-italic">Password</label>
                    <input type="password" style={{ backgroundColor: 'transparent' }} className="form-control text-dark" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
              <label htmlFor="address" style={{fontWeight:"bold"}} className="form-label text-dark fst-italic">Address </label>
              <div>
                <div className='container'>
                <div className='row'>
                <div className='col'>
                <input type="text" style={{ backgroundColor: 'transparent' }}  className="form-control text-dark" name='address' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
                </div>
                <div className='col'>
                <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Locate Me <IoLocation /></button>
                </div>
                </div>
                </div>
               
                
              </div>
            </div>
                <button type="submit" style={{ backgroundColor: "#6e60dd" }} className="m-3 btn btn-primary">Submit</button>
                <Link to='/login' style={{fontWeight:"bold"}} className="form-label text-dark fst-italic">Already Have Account</Link>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Signup
