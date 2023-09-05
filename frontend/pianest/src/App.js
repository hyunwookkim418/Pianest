import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";

function App() {
  const [loggedIn,setLoggedIn]=useState(false)
  return (
    <>
    <Login></Login>
    </>
  );
}

export default App;
