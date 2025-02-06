import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import Sidebar from "./AdminSidebar";
import "./AdminProject.css";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newProject, setNewProject] = useState({ title: "", description: "", technologies: "" });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/project");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:8080/project", newProject);
      setProjects([...projects, response.data]);
      setNewProject({ title: "", description: "", technologies: "" });
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Handle deleting a project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/project/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle editing a project
  const handleEdit = async () => {
    try {
      const updatedProject = { ...newProject };
      const response = await axios.put(`http://localhost:8080/project/${editing.id}`, updatedProject);
      setProjects(projects.map((project) => (project.id === editing.id ? response.data : project)));
      setEditing(null);
      setNewProject({ title: "", description: "", technologies: "" });
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="project-content">
        <h2>Projects</h2>
        <button
          className="add-button"
          onClick={() => {
            setEditing(null);
            setNewProject({ title: "", description: "", technologies: "" });
            setShowPopup(true);
          }}
        >
          <FaPlus /> Add Project
        </button>

        {showPopup && (
          <div className="modal">
            <div className="modal-content">
              <h3>{editing ? "Edit Project" : "Add Project"}</h3>
              <input
                type="text"
                name="title"
                value={newProject.title}
                placeholder="Project Title"
                onChange={handleChange}
                className="modal-input"
              />
              <input
                type="text"
                name="description"
                value={newProject.description}
                placeholder="Project Description"
                onChange={handleChange}
                className="modal-input"
              />
              <input
                type="text"
                name="technologies"
                value={newProject.technologies}
                placeholder="Technologies Used"
                onChange={handleChange}
                className="modal-input"
              />
              <button className="save-button" onClick={editing ? handleEdit : handleAdd}>
                {editing ? "Update Project" : "Add Project"}
              </button>
              <button className="cancel-button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Technologies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project.technologies}</td>
                    <td>
                      <FaEdit
                        className="edit-icon"
                        onClick={() => {
                          setEditing(project);
                          setNewProject({
                            title: project.title,
                            description: project.description,
                            technologies: project.technologies,
                          });
                          setShowPopup(true);
                        }}
                      />
                      <FaTrash
                        className="delete-icon"
                        onClick={() => handleDelete(project.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;

