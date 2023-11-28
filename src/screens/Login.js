import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    // console.log(json);
    if (json.success) {
      alert("Login Successful")
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
    else {
      alert("Please SignUp")
    }
  }

  const onchange = async (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='card mt-5 m-auto ' style={{"maxWidth":"500px"}}>
        <h3>LOGIN FORM</h3>
        <div className='container'>
          <form onSubmit={handlesubmit}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="exampleInputPassword1" />
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/CreateUser" className="m-3 btn btn-danger">New User</Link>
            
          </form>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
