import React from 'react'
import './App.css';
import Home from "./pages/Home/Home.jsx"
import SignUp from './pages/Sign Up/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import OurLegacy from './pages/Our Legacy/OurLegacy';
import ContactUs from './pages/Contact Us/ContactUs';
import NavBar from './components/navbar/NavBar';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <NavBar />
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          {/* line 13 directs to home page */}
          <Route path="/" element={<Home />}></Route> 
          <Route path="/ourLegacy" element={<OurLegacy />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/contactUs" element={<ContactUs />}></Route>
          <Route path="/dashBoard" element={<Dashboard />}></Route>
        </Routes>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
