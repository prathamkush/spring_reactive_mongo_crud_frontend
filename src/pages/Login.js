import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {

    let navigate = useNavigate()

    const emailAdmin='admin@gmail.com';
    const passwordAdmin='Admin@123';

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    
    const onSubmit = async (e) => {
        e.preventDefault();

        if(email==emailAdmin && password==passwordAdmin){
            navigate("/admin-home")
        }

        else{
            alert("Incorrect Email or Password")
        }
    }


    return (
        <div style={{   width:"400px",
                        height: "400px",
                        position:"absolute",
                        top:0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        margin:"auto"}}>
            <form onSubmit={(e) => onSubmit(e)}>
                <h3>Sign In</h3>
                <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    required="true"
                    onChange={(e) => onEmailChange(e)}
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required="true"
                    onChange={(e) => onPasswordChange(e)}
                />
                </div>
            
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                </div>
            </form>

      </div>
    )
  
}