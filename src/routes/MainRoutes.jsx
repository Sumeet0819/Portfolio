import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import About from "../pages/About";
import ProjectView from "../components/ProjectView";

const MainRoutes = () => {
  return (
    <Router>
      {/* Main content area */}
      <div style={{ minHeight: "calc(100vh - 120px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default MainRoutes;

