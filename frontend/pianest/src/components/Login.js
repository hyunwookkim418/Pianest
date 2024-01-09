import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* The line `import { useNavigate } from "react-router-dom";` is importing the `useNavigate` hook from
the `react-router-dom` library. */
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = (message) => toast.error(message);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      notify('Both email and password are required');
      return;
    }

    try {
      // Call the server endpoint for login
      const response = await fetch('http://localhost:4000/auth/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      

      if (response.ok) {
        const data = await response.json();
        // Assuming the server sends a token on successful login
        console.log('Login successful. Token:', data.token);
        navigate("/");
        localStorage.setItem("token",data.token)
        localStorage.setItem("username",data.token)

        // Perform any other actions needed on successful login
      } 
      else {

        // Handle login error
        notify('Invalid email or password');
        // Optionally, shownotify or update the UI to indicate login failure
      }
    } catch (error) {
      notify('Error during login:'+ error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <br />
                <p>
                  Don't have an account? <Link to={`/signup`}>Sign up</Link> instead?
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
