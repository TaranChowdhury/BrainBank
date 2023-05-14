import React from "react";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import SignUp from "./pages/Sign Up/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import OurLegacy from "./pages/Our Legacy/OurLegacy";
import Project from "./pages/Project/Project";
import ContactUs from "./pages/Contact Us/ContactUs";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetails from "./pages/Project/ProjectDetails";
import ProjectUpdate from "./pages/Project/ProjectUpdate";

function App() {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <NavBar />
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourLegacy" element={<OurLegacy />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/create" element={<Project />} /> {/* Add this line */}
          <Route path="/project/:projectId/" element={<ProjectDetails />} />
          <Route path="/project/:projectId/update" element={<ProjectUpdate />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/dashBoard" element={<Dashboard />} />
        </Routes>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
