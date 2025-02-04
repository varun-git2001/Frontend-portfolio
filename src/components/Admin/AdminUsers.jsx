import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import AdminSidebar from "./AdminSidebar"; // Import AdminSidebar

const UserSection = ({ onEdit, onAdd }) => {
  const [usersData, setUsersData] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // Track deleting user

  // Fetch users data from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Delete user from backend and update state
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(id); // Trigger fade-out animation
      await axios.delete(`http://localhost:8080/api/users/${id}`); // Backend delete API
      setUsersData((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="user-section-container">
      {/* Admin Sidebar */}
      <AdminSidebar /> {/* Add the AdminSidebar here */}

      <div className="main-content">
        <h2>Users</h2>
        <button className="add-button" onClick={() => onAdd("user")}>
          <FaPlus /> Add User
        </button>
        <div className="card-container">
          {usersData.length > 0 ? (
            usersData.map((user) => (
              <div
                className={`card ${deletingId === user.id ? "fade-out" : ""}`}
                key={user.id}
              >
                <span className="card-content">{user.name}</span>
                <FaEdit
                  className="edit-icon"
                  onClick={() => onEdit(user.id, "user", user.name)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(user.id)}
                />
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSection;
