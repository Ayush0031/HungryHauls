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
      
      <span className="col fst-italic text-center text-dark" style={boldText}><img alt="" src='./logo_wt.png' height={75} />HungryHauls, Inc © 2024 </span>
      <hr />
    </div>
    

   
  </footer>
    </div>
  )
}
