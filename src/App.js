import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/main/main";
import { auth } from "./firebase";


function App() {
  const [userName, setUserName] = useState("");

 /* useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);*/
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/metroNav" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
