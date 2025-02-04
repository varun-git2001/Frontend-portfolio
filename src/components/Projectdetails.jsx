import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../Connect/Api"; 

const BASE_URL = "http://localhost:8080/"; // Your backend URL

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const fetchedProject = await fetchProjectById(id); 
        setProject(fetchedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    loadProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <section id="project-detail" className="card">
      <div className="card-header">
        <h2>{project.title}</h2>
      </div>
      <div className="card-body">
        <p>{project.description}</p>
        {/* Dynamically display the project image */}
        {project.image && (
          <img 
            src={`${BASE_URL}${project.image}`} 
            alt={project.title} 
            className="project-image"
          />
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
