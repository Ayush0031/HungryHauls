import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const[search,setSearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const toggleSliderVisibility = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  const [price, setPrice] = useState(100);

  const handleChange = (event) => {
    setPrice(event.target.value);
  }

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[1],response[0])
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  let style={
            
    backgroundColor: "#6e60dd"
}
  return (
    <div className="home-container">
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{objectFit:"contain !important"}} data-bs-ride="carousel">
  <div className="carousel-inner" id="carousel">
    <div className='carousel-caption' style={{"zIndex":"100"}}>
    <div className="d-flex justify-content-center">
    
      <input className="form-control me-2 h-100" type="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" aria-label="Search"/>
      {/* <button className="btn btn-outline-danger text-white" style={{ backgroundColor: "#6e60dd" }}type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900*700/?cake" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900*700/?pizza" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900*700/?burger" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      
      <div className={`slider-container ${isSliderVisible ? 'visible' : 'hidden'}`}>
      <div className="slider-content">
        <input
          type="range"
          min="100"
          max="1000"
          value={price}
          onChange={handleChange}
          className="slider"
        />
        <span id="price-display">₹{price}</span>
      </div>
      
    </div>
    <button className="toggle-btn slider-container-btn" onClick={toggleSliderVisibility}>
        {isSliderVisible ? 'Price Filter' : 'Price Filter'}
      </button>
      <div className="container" >
      
        {/* Logic to display data in cards based on category #9 35m */}
        {foodCat !==[]
          ? foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 fst-italic m-3 text-center col" style={style}>
                  {data.CategoryName}
                </div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                {foodItem !==[]
                  ? foodItem
                    .filter(
                      (item) => (item.CategoryName === data.CategoryName) 
                      &&(item.options[0].half<=price||item.options[0].regular<=price)
                      &&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                    )
                    .map((food) => {
                      return (
                        <div className="col-12 col-md-6 col-lg-4">
                          <Card data={food} options={food.options[0]} key={food._id}/>
                        </div>
                      );
                    })
                  : ""}
              </div> 
            );
          })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
    </div>
  );
}
