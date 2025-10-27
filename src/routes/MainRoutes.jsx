import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import Home from "../pages/Home";
import About from "../pages/About";
import ProjectView from "../components/ProjectView";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/project/:id" element={<PageWrapper><ProjectView /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </LayoutGroup>
  );
}

const MainRoutes = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};

export default MainRoutes;

