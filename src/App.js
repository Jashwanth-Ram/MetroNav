import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {  useState } from "react";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/main/main";
import Login from "./Components/Login/Login";


function App() {

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
