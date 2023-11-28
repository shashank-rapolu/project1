import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import { useState } from 'react';
import Cart from '../screens/Cart';
import Model from '../model';
import { useCart } from './contextReducer';


export default function Navbar() {
  let data = useCart();

  const [cartView, setcartView] = useState(false)
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GOFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))
                ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 " aria-current="page" to="/myorders">My Orders</Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken"))
              ?
              <div className='d-flex'>

                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/CreateUser">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-1' onClick={(e)=>{setcartView(true)}}>
                 
                    MyCart
                    <Badge pill bg='danger' className='mx-2'>{data.length}</Badge>
                </div>
                {cartView?<Model onClose={()=>{setcartView(false)}}><Cart/></Model>:null}
                <div className='btn bg-white text-danger mx-1' onClick={handlelogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
