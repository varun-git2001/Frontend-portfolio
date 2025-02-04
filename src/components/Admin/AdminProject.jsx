import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./AdminProject.css";
import Sidebar from "./AdminSidebar"; // Import Sidebar component

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [newProject, setNewProject] = useState({ title: "", description: "", technologies: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // For editing project

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/project");
        setProjects(response.data); // Assuming the response contains an array of projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle project deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:8080/project/${id}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle project field change for Add/Edit
  const handleFieldChange = (field, value) => {
    if (editingProject) {
      setEditingProject((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setNewProject((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Handle saving updated or new project
  const handleSave = async () => {
    if (!newProject.title || !newProject.description || !newProject.technologies) {
      alert("All fields must be filled in.");
      return;
    }

    try {
      if (editingProject) {
        // Save updated project (edit mode)
        await axios.put(`http://localhost:8080/project/${editingProject.id}`, {
          title: editingProject.title,
          description: editingProject.description,
          technologies: editingProject.technologies,
        });

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === editingProject.id ? editingProject : project
          )
        );
        setEditingProject(null); // Close edit mode
      } else {
        // Add new project (add mode)
        const response = await axios.post("http://localhost:8080/project", {
          title: newProject.title,
          description: newProject.description,
          technologies: newProject.technologies,
        });

        setProjects((prevProjects) => [...prevProjects, response.data]);
        setNewProject({ title: "", description: "", technologies: "" }); // Reset new project fields
      }

      setIsModalOpen(false); // Close modal after saving
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Handle adding new project
  const handleAdd = () => {
    setNewProject({ title: "", description: "", technologies: "" }); // Reset new project fields
    setEditingProject(null); // Ensure we are in add mode
    setIsModalOpen(true); // Open modal in add mode
  };

  // Handle edit mode
  const handleEdit = (project) => {
    setEditingProject(project); // Set the project to be edited
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
    });
    setIsModalOpen(true); // Open modal in edit mode
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingProject(null); // Close edit mode
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      {/* Sidebar component added here */}
      <Sidebar />

      <h2>Projects</h2>

      {/* Add Project Button */}
      <button className="add-button" onClick={handleAdd}>
        <FaPlus /> Add Project
      </button>

      {/* Projects List in Table Format */}
      <div className="table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className={deletingId === project.id ? "fade-out" : ""}>
                  <td>
                    {editingProject && editingProject.id === project.id ? (
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                      />
                    ) : (
                      project.title
                    )}
                  </td>
                  <td>
                    {editingProject && editingProject.id === project.id ? (
                      <input
                        type="text"
                        value={editingProject.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                      />
                    ) : (
                      project.description
                    )}
                  </td>
                  <td>
                    {editingProject && editingProject.id === project.id ? (
                      <input
                        type="text"
                        value={editingProject.technologies}
                        onChange={(e) => handleFieldChange("technologies", e.target.value)}
                      />
                    ) : (
                      project.technologies
                    )}
                  </td>
                  <td>
                    {/* Remove these buttons when editing */}
                    {!editingProject || editingProject.id !== project.id ? (
                      <>
                        <FaEdit
                          className="edit-icon"
                          onClick={() => handleEdit(project)}
                        />
                        <FaTrash
                          className="delete-icon"
                          onClick={() => handleDelete(project.id)}
                        />
                      </>
                    ) : null}
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

      {/* Modal for Adding or Editing Project */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
            <input
              type="text"
              placeholder="Enter project title"
              value={editingProject ? editingProject.title : newProject.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter project description"
              value={editingProject ? editingProject.description : newProject.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter technologies"
              value={editingProject ? editingProject.technologies : newProject.technologies}
              onChange={(e) => handleFieldChange("technologies", e.target.value)}
            />
            <div className="modal-buttons">
              <button className="save-button" onClick={handleSave}>
                {editingProject ? "Update" : "Save"}
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
