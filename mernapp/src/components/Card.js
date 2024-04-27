import React, { useState,useRef, useEffect } from 'react'
import { useDispatch,useCart } from './ContextReducer';
const Card = (props) => {
  let dispatch=useDispatch();
  let cartItems=useCart();
  let options=props.options;
  let priceOptions=Object.keys(options);
  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("");
  const priceRef=useRef();
  const handleAddToCart=async ()=>{
    let food = []
    for (const item of cartItems) {
      if (item.id === props.data._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.data._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.data._id, name: props.data.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    
      await dispatch({type:"ADD",id:props.data._id,name:props.data.name,price:finalPrice,qty:qty,size:size})
      console.log(cartItems);
  }
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div
          className="card mt-3 "
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img className="card-img-top" style={{ height: "120px", objectFit: "fill" }} src={props.data.img} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.data.name}</h5>
            {/* <p className="card-text">{props.data.description}</p> */}
            <div className="container w-100">
              <select
                className="m-2 h-100 rounded "
                style={{ backgroundColor: "#6e60dd" }}  onChange={(e)=>{setQty(e.target.value)}}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              
              <select
                className="m-2 h-100 rounded "
                style={{ backgroundColor: "#6e60dd" }} ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}
              >
                {
                  priceOptions.map((data)=>{
                    return <option value={data} key={data}>{data}</option>
                  })
                }
              </select>
              <div className="d-inline h-100 fs-5"> ₹{finalPrice}/-</div>
              <hr></hr>
              <button className={'btn btn-success justify-content mb-6'} onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default Card
