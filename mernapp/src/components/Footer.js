import React from 'react'


export default function Footer() {
  let style={
            
    backgroundColor: "#6e60dd",
    position: "relative",
    
    
    
}
let boldText = {
  fontWeight: 'bold'
};
  return (
    <div>
      <footer className="m-4 d-flex flex-wrap justify-content-between text-center " >
    <div className="container col-md-4 d-flexr">
      
      <span className="col fst-italic text-center" style={boldText}>HungryHauls, Inc © 2024 </span>
      <hr />
    </div>
    

   
  </footer>
    </div>
  )
}
