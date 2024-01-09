import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

    const [fullName,setfullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPass,setConfrirmPass]=useState("")

    const notify = (message) => toast.error(message);


    const handleSignup = async (e) => {
        e.preventDefault();
    
        if (!fullName.trim() || !email || !password || !confirmPass) {
            notify('All fields are required');
            return;
          }
      
          if (!validateEmail(email)) {
            notify('Invalid email format');
            return;
          }
      
          if (password !== confirmPass) {
            notify('Passwords do not match');
            return;
          }
      
          if (!validatePasswordStrength(password)) {
            notify('Password should be at least 8 characters long');
            return;
          }
    
        // Prepare user data to be sent to the server
        const userData = {
          fullName,
          email,
          password,
        };
    
        try {
          const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          
          console.log("here",response.error)
          if (response.ok) {
            // Successful registration
            console.log('User registered successfully');
            setfullName('');
            setEmail('');
            setPassword('');
            setConfrirmPass('');
          } else {
            // Handle registration error
            notify('Error registering user');
          }
        } catch (error) {
          notify('Error during registration: '+  error.message);
        }
      };

 // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password strength (at least 8 characters)
  const validatePasswordStrength = (password) => {
    return password.length >= 8;
  };

  return (
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    Sign Up
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="userfullName" value={fullName} onChange={(e)=>{setfullName(e.target.value)}}  placeholder="Enter your username" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" />
                        </div>
                        <div class="form-group">
                            <label for="password">Confirm Password:</label>
                            <input type="password" class="form-control" value={confirmPass} onChange={(e)=>(setConfrirmPass(e.target.value))} id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={handleSignup} >Sign Up</button>
                      <br/>
                        <p>Already have an account <Link to={`/login`}>login</Link> instead?</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}
