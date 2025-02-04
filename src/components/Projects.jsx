import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../Connect/Api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      setProjects(fetchedProjects || []);
    };
    loadProjects();
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="project" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 50)}...</p>
              {/* Link styled as button */}
              <Link to={`/projects/${project.id}`} className="view-details">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
