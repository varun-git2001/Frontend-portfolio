import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import AdminSidebar from "./AdminSidebar"; // Import AdminSidebar

const AdminUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // Track deleting user
  const [newUserUsername, setNewUserUsername] = useState(""); // For username
  const [newUserPassword, setNewUserPassword] = useState(""); // For password
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch users data from the backend
  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Add a new user to the backend
  const handleAddUser = async () => {
    if (!newUserUsername.trim() || !newUserPassword.trim()) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        username: newUserUsername,
        password: newUserPassword,
      });
      if (response.data) {
        setUsersData((prevUsers) => [...prevUsers, response.data]);
      }
      setNewUserUsername(""); // Reset the username input
      setNewUserPassword(""); // Reset the password input
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Edit an existing user's name and password
  const handleEditUser = async () => {
    if (!newUserUsername.trim() || !newUserPassword.trim()) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${editingUserId}`,
        { username: newUserUsername, password: newUserPassword }
      );
      setUsersData((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === editingUserId
            ? { ...user, username: response.data.username, password: response.data.password }
            : user
        )
      );
      setNewUserUsername(""); // Reset the username input
      setNewUserPassword(""); // Reset the password input
      setIsModalOpen(false); // Close the modal
      setIsEditing(false); // Reset editing state
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  // Delete a user from the backend and update state
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(id); // Trigger fade-out animation
      await axios.delete(`http://localhost:8080/api/users/${id}`); // Backend delete API
      setUsersData((prevUsers) => prevUsers.filter((user) => user.userId !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingId(null); // Reset deletingId state
    }
  };

  // Open modal for adding a new user
  const openAddModal = () => {
    setNewUserUsername(""); // Clear username input
    setNewUserPassword(""); // Clear password input
    setIsEditing(false); // Reset editing state
    setIsModalOpen(true); // Open modal
  };

  // Open modal for editing an existing user
  const openEditModal = (id, currentUsername, currentPassword) => {
    setEditingUserId(id); // Set the ID of the user to be edited
    setNewUserUsername(currentUsername); // Set the current username in the input
    setNewUserPassword(currentPassword); // Set the current password in the input
    setIsEditing(true); // Set editing state
    setIsModalOpen(true); // Open modal
  };

  return (
    <div className="user-section-container">
      {/* Admin Sidebar */}
      <AdminSidebar /> {/* Add the AdminSidebar here */}

      <div className="main-content">
        <h2>Users</h2>
        <button className="add-button" onClick={openAddModal}>
          <FaPlus /> Add User
        </button>
        <div className="card-container">
          {usersData.length > 0 ? (
            usersData.map((user) => (
              <div
                className={`card ${deletingId === user.userId ? "fade-out" : ""}`}
                key={user.userId} // Ensure each item has a unique key
              >
                <span className="card-content">{user.username}</span>
                <FaEdit
                  className="edit-icon"
                  onClick={() => openEditModal(user.userId, user.username, user.password)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(user.userId)}
                />
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit User */}
      {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3>{isEditing ? "Edit User" : "Add User"}</h3>
      <input
        type="text"
        name="username"
        value={newUserUsername}
        placeholder="Enter username"
        onChange={(e) => setNewUserUsername(e.target.value)}
        className="modal-input"
      />
      <input
        type="password"
        name="password"
        value={newUserPassword}
        placeholder="Enter password"
        onChange={(e) => setNewUserPassword(e.target.value)}
        className="modal-input"
      />
      <button className="save-button" onClick={isEditing ? handleEditUser : handleAddUser}>
        {isEditing ? "Update User" : "Add User"}
      </button>
      <button className="cancel-button" onClick={() => setIsModalOpen(false)}>
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminUsers;
