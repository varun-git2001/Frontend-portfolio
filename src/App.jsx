import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import ProjectDetail from "./components/Projectdetails";
import Login from "./components/Login";
import Dashboard from "./components/Admin/Dashboard";
import AdminEducation from "./components/Admin/AdminEducation";
import AdminProject from "./components/Admin/AdminProject";
import AdminSkill from "./components/Admin/AdminSkill";
import AdminUsers from "./components/Admin/AdminUsers";
// import Footer from "./components/Footer";
import "./App.css";

import "./components/Hero.css";
import "./components/About.css";
import "./components/Project.css";
import "./components/Education.css";
import "./components/Skill.css";
import "./components/Header.css";
import "./components/Projectdetails.css";

const AppContent = () => {
  const location = useLocation();
  
  // Hide navbar in admin routes
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard");
  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {!hideNavbar && <Header />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/education"
          element={
            <ProtectedRoute>
              <AdminEducation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <AdminProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/skills"
          element={
            <ProtectedRoute>
              <AdminSkill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;