import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css"; 
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard/users">
        <button>Users</button>
      </Link>
      <Link to="/dashboard/projects">
        <button>Projects</button>
      </Link>
      <Link to="/dashboard/skills">
        <button>Skills</button>
      </Link>
      <Link to="/dashboard/education">
        <button>Education</button>
      </Link>
    </div>
  );
};

export default Sidebar;
