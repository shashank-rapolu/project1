import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignUp() {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, location: credentials.geolocation, password: credentials.password })
        })
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            alert("New User Created")
            navigate("/login");
        }
        else {
            alert("Enter Valid Credentials")
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
        <h3>SIGN UP  FORM</h3>
        <div className='container'>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label"> Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange} id="exampleInputName1" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                        <input type="password" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onchange} id="exampleInputAddresss1" />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
            </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    )
}
