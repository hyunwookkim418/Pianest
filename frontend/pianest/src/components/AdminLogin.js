import React from 'react'
import { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const notify = (message) => toast.error(message);
    const navigate = useNavigate();
    const [fullName, setfullName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        
        e.preventDefault();
        

        // Basic client-side validation
        if (!fullName || !password) {
          notify('Both fullName and password are required');
          return;
        }
    
        try {
          // Call the server endpoint for login
        //   alert("here")
          const response = await fetch('http://localhost:4000/auth/admin_sign_in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName,
              password,
            }),
          });
    
          
    
          if (response.ok) {
            const data = await response.json();
            // Assuming the server sends a token on successful login
            console.log('Login successful. Token:', data.token);
            // navigate("/");
            
            localStorage.setItem("token",data.token)
            navigate('/admin/home')
            // Perform any other actions needed on successful login
          } 
          else {
    
            // Handle login error
            notify('Invalid Name or password');
            // Optionally, shownotify or update the UI to indicate login failure
          }
        } catch (error) {
          notify('Error during login:'+ error.message);
        }
      };
    
    
  return (
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    Admin Login
                </div>
                <div class="card-body">
                    <form onSubmit={handleLogin}>
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" value={fullName} onChange={(e)=>setfullName(e.target.value)} placeholder="Enter your username" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password"  class="form-control" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" / >
                        </div>
                        <button type="submit"    class="btn btn-primary">Login</button>
                        <br/>
            

                    </form>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer></ToastContainer>
</div>
  )
}
