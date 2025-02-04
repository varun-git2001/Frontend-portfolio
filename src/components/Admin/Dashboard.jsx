
import React from "react";
import AdminSidebar from "./AdminSidebar"; // Import the sidebar
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <AdminSidebar /> {/* Sidebar Component */}
      <div className="content">
        <h2>Admin Dashboard</h2>
        <div className="card-container">
          <p>Select a section from the sidebar to manage users, projects, skills, or education.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
