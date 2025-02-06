import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when a link is clicked
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        {/* Move hamburger inside sidebar when open */}
        {isSidebarOpen && (
          <button className="hamburger" onClick={toggleSidebar}>
            
          </button>
        )}
      <div className="sidechicks">
        <Link to="/dashboard/users" onClick={closeSidebar}>
          <button>Users</button>
        </Link>
        <Link to="/dashboard/skills" onClick={closeSidebar}>
          <button>Skills</button>
        </Link>
        <Link to="/dashboard/education" onClick={closeSidebar}>
          <button>Education</button>
        </Link>
        <Link to="/dashboard/projects" onClick={closeSidebar}>
          <button>Projects</button>
        </Link>
        </div> 
        {/* Logout Button */}
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
        </div>
      
    </>
  );
};

export default Sidebar;

