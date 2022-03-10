import React from "react";
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}


export default App;