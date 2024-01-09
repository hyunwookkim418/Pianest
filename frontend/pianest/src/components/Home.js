import React from 'react'
import { useState } from 'react'

import Login from './Login';
import Signup from './Signup';
import { Outlet, Link } from "react-router-dom";
export default function Home() {

 

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Pianest</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#home"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" ><Link to={'calendar'}>Calendar</Link></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#logout">
                <Link to={`login`}>Logout</Link>
                </a>
            </li>
        </ul>
    </div>
</nav>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6">
          <br/>
            <h2>Welcome to Your Piano School</h2>
            <p>Learn to play the piano with our expert instructors. Whether you are a beginner or an advanced player, we have lessons tailored to your skill level.</p>
            <p>Our lessons cover various genres, techniques, and styles. Join us and embark on a musical journey with the piano.</p>
            <a href="#lessons" class="btn btn-primary">Explore Lessons</a>
        </div>
        <div class="col-md-6">
          <br/>
            <img src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="img-fluid" alt="Piano Lessons" />
        </div>
    </div>
</div>

<div id="lessons" class="container mt-5">
    <h2>Our Piano Lessons</h2>
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                {/* <img src="https://as1.ftcdn.net/v2/jpg/04/10/85/60/1000_F_410856041_bKxsQ6yun2JMN9gAdGanEu0doeSFFJrh.jpg" class="card-img-top" alt="Lesson 1" /> */}
                <div class="card-body">
                    <h5 class="card-title">Beginner's Course</h5>
                    <p class="card-text">Perfect for those who are new to the piano. Learn the basics and build a strong foundation.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                {/* <img src="https://as2.ftcdn.net/v2/jpg/01/10/24/43/1000_F_110244351_PgJm7QvsvfGKc1EFxkcVt5oubWTcj8Uz.jpg" class="card-img-top" alt="Lesson 2" /> */}
                <div class="card-body">
                    <h5 class="card-title">Intermediate Level</h5>
                    <p class="card-text">Advance your skills with more complex techniques and repertoire. Suitable for intermediate players.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                {/* <img src="lesson3.jpg" class="card-img-top" alt="Lesson 3" /> */}
                <div class="card-body">
                    <h5 class="card-title">Advanced Masterclass</h5>
                    <p class="card-text">Take your piano playing to the next level with our advanced masterclass. Fine-tune your artistry.</p>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}
