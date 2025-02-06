import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import Sidebar from "./AdminSidebar";  // Import Sidebar component
import "./AdminEducation.css";

const EducationSection = ({ deletingId }) => {
  const [educationData, setEducationData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newEducation, setNewEducation] = useState({ institution: "", degree: "", duration: "" });
  const [showPopup, setShowPopup] = useState(false);

  // Fetch education data from the backend
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get("http://localhost:8080/education");
        setEducationData(response.data); // Assuming the response contains an array of education data
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducation();
  }, []); 

  // Handle adding a new education entry
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:8080/education", newEducation);
      setEducationData([...educationData, response.data]);
      setNewEducation({ institution: "", degree: "", duration: "" });
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding education data:", error);
    }
  };

  // Handle deleting an education entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/education/${id}`);
      setEducationData(educationData.filter((edu) => edu.id !== id));
    } catch (error) {
      console.error("Error deleting education data:", error);
    }
  };

  // Handle editing an education entry
  const handleEdit = async () => {
    try {
      const updatedEducation = { ...newEducation };
      const response = await axios.put(`http://localhost:8080/education/${editing.id}`, updatedEducation);
      setEducationData(
        educationData.map((edu) => (edu.id === editing.id ? response.data : edu))
      );
      setEditing(null);
      setNewEducation({ institution: "", degree: "", duration: "" });
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating education data:", error);
    }
  };

  // Handle input changes for new or edited education data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  return (
    <div className="admin-container">
      <Sidebar /> {/* Add Sidebar here */}
      <div className="education-content">
        <h2>Education</h2>
        <button className="add-button" onClick={() => { 
          setEditing(null); 
          setNewEducation({ institution: "", degree: "", duration: "" }); // Reset fields
          setShowPopup(true); 
        }}>
          <FaPlus /> Add Education
        </button>

        
        {showPopup && (
  <div className="modal">
    <div className="modal-content">
      <h3>{editing ? "Edit Education" : "Add Education"}</h3>
      <input
        type="text"
        name="institution"
        value={newEducation.institution}
        placeholder="Institution"
        onChange={handleChange}
        className="modal-input"
      />
      <input
        type="text"
        name="degree"
        value={newEducation.degree}
        placeholder="Degree"
        onChange={handleChange}
        className="modal-input"
      />
      <input
        type="text"
        name="duration"
        value={newEducation.duration}
        placeholder="Duration (e.g., 2018-2022)"
        onChange={handleChange}
        className="modal-input"
      />
      <button className="save-button" onClick={editing ? handleEdit : handleAdd}>
        {editing ? "Update Education" : "Add Education"}
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
        <th>Institution</th>
        <th>Degree</th>
        <th>Duration</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {educationData.length > 0 ? (
        educationData.map((edu) => (
          <tr key={edu.id} className={deletingId === edu.id ? "fade-out" : ""}>
            <td>{edu.institution}</td>
            <td>{edu.degree}</td>
            <td>{edu.duration}</td>
            <td>
              <FaEdit
                className="edit-icon"
                onClick={() => {
                  setEditing(edu);
                  setNewEducation({
                    institution: edu.institution,
                    degree: edu.degree,
                    duration: edu.duration,
                  });
                  setShowPopup(true);
                }}
              />
              <FaTrash className="delete-icon" onClick={() => handleDelete(edu.id)} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">No education data found</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default EducationSection;
