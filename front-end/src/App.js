import React from "react";
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Processors from "./pages/processors";
import HearingAids from "./pages/hearing";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/processors" element={<Processors />} />
        <Route exact path="/hearing_aids" element={<HearingAids />} />
      </Routes>
    </Router>
  )
}


export default App;