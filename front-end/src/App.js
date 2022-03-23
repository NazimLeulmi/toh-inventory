import React from "react";
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Processors from "./pages/processors";
import HearingAids from "./pages/hearing";
import DeliveryForm from "./pages/delivery";
import axios from "axios";
import Delivered from "./pages/delivered";

// Send cookies with http requests
axios.defaults.withCredentials = true



export const AuthContext = React.createContext();
export const ProcessorsContext = React.createContext();

function App() {
  const [auth, setAuth] = React.useState(null);
  const [processors, setProcessors] = React.useState(null);
  const authProviderValue = React.useMemo(() => ({ auth, setAuth }), [auth, setAuth])
  const processorsProviderValue = React.useMemo(() => ({ processors, setProcessors }), [processors, setProcessors])

  return (
    <Router>
      <AuthContext.Provider value={authProviderValue}>
        <ProcessorsContext.Provider value={processorsProviderValue}>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/processors" element={<Processors />} />
            <Route exact path="/hearing_aids" element={<HearingAids />} />
            <Route exact path="/delivery" element={<DeliveryForm />} />
            <Route exact path="/delivered" element={<Delivered />} />
          </Routes>
        </ProcessorsContext.Provider>
      </AuthContext.Provider>
    </Router>
  )
}


export default App;