import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Card from '../components/Card'




export default function Home() {
  const [search, setsearch] = useState("")
  const [foodcategory, setfoodcategory] = useState([]);
  const [fooditems, setfooditems] = useState([]);

  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooditems", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    //  console.log(response[0],response[1]);
    setfoodcategory(response[1]);
    setfooditems(response[0]);

  }

  useEffect(() => {
    loaddata()
  }, []);


  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ "zIndex": "10" }}>
            <div className='d-flex justify-content-center'>
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?Burger" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?Biryani" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?Juice" className="d-block w-100" alt="..." />
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

      <div className='container'>
        {
          foodcategory !== [] ? foodcategory.map((data) => {
            return (
              <div className='row mx-2'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {fooditems !== [] ? fooditems.filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase()))) 
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 '>
                        <Card fooditems={filterItems}
                          options={filterItems.options[0]}
                          >

                        </Card>
                      </div>
                    )
                  }) : <div>No Such Data found</div>}
              </div>
            )
          }) : ""
        }
      </div>
      <div>
        <Footer />
      </div>
    </div >
  )
}
