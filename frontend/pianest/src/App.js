import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import EventCalendar from "./components/EventCalendar";
import AdminHomePage from "./components/AdminHome";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AdminEvents from "./components/AdminEvents";
function App() {
  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/signup" element={<Signup />}> </Route>
        
        <Route path="/calendar" element={<EventCalendar />}> </Route>
          
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route path="/admin/home" element={<AdminHomePage />}> </Route>
        <Route path="/admin/events" element={<AdminEvents />}> </Route>
        

       
      </Routes>
    </Router>
  );
}

export default App;
