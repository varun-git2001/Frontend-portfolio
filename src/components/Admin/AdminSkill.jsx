import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./AdminSkill.css";
import Sidebar from "./AdminSidebar"; // Make sure the path is correct

const SkillSection = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);

  // Fetch skills data from the backend
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/skill");
      setSkillsData(response.data);
    } catch (error) {
      console.error("Error fetching skills data:", error);
    }
  };

  // Handle skill deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:8080/skill/${id}`);
      setSkillsData((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Open Modal for Adding Skill
  const openAddModal = () => {
    setNewSkill("");
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open Modal for Editing Skill
  const openEditModal = (id, currentName) => {
    setEditingSkillId(id);
    setNewSkill(currentName);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle Save (Add or Edit)
  const handleSave = async () => {
    if (!newSkill.trim()) {
      alert("Skill name cannot be empty");
      return;
    }

    try {
      if (isEditing) {
        // Editing existing skill
        await axios.put(`http://localhost:8080/skill/${editingSkillId}`, {
          name: newSkill,
        });

        setSkillsData((prevSkills) =>
          prevSkills.map((skill) =>
            skill.id === editingSkillId ? { ...skill, name: newSkill } : skill
          )
        );
      } else {
        // Adding new skill
        const response = await axios.post("http://localhost:8080/skill", {
          name: newSkill,
        });

        if (response.data) {
          setSkillsData((prevSkills) => [...prevSkills, response.data]);
        }
      }

      // Close Modal after Save
      setNewSkill("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  return (
    <div className="skill-section-container">
      {/* Sidebar Component */}
      <Sidebar /> {/* Add the Sidebar here */}

      <div className="main-content">
        <h2>Skills</h2>

        {/* Add Skill Button */}
        <button className="add-button" onClick={openAddModal}>
          <FaPlus /> Add Skill
        </button>

        {/* Skills List */}
        <div className="card-container">
          {skillsData.length > 0 ? (
            skillsData.map((skill) => (
              <div className={`card ${deletingId === skill.id ? "fade-out" : ""}`} key={skill.id}>
                <span className="card-content">{skill.name}</span>
                <FaEdit className="edit-icon" onClick={() => openEditModal(skill.id, skill.name)} />
                <FaTrash className="delete-icon" onClick={() => handleDelete(skill.id)} />
              </div>
            ))
          ) : (
            <p>No skills found</p>
          )}
        </div>

        {/* Modal for Adding/Editing Skill */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>{isEditing ? "Edit Skill" : "Add New Skill"}</h3>
              <input
                type="text"
                placeholder="Enter skill name"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="save-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;
