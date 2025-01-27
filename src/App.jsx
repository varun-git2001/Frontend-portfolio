import React, { useEffect, useState } from "react";
import "./App.css";

import { fetchSkills, fetchProjects ,fetchEducation} from "./Connect/Api";
import varun from "./assets/final1.png";

import asset1 from "./assets/College.svg";
import asset2 from "./assets/Secondary.png";
import asset3 from "./assets/School.png";

import C from "./assets/C.png";
import Cpp from "./assets/C++.png";
import DS from "./assets/DS.png";
import HTML from "./assets/HTML.png";
import PG from "./assets/PG.png";
import CSS from "./assets/CSS.png";

import git from "./assets/github.png";
import linkedin from "./assets/in.png";
import insta from "./assets/insta.png";

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
);

const Hero = () => (
  <section id="hero">
    <div className="hero-text">
      <h1>
        Hello, I'm <span>Varun</span>
      </h1>
      <p className="typing">Associate Software Engineer</p>
      <div className="links">
      <a href="#projects" className="btn">My Works</a>
      <a href="https://drive.google.com/file/d/138BigC2esvqr3OypoSsq7Uoh7-TTHrdl/view?usp=drive_link" className="btn">Resume</a>
      </div>
    </div>
    <img src={varun} alt="Varun" />
  </section>
);

const About = () => (
  <section id="about">
    <h2>About Me</h2>
    <p>
      I'm a software developer passionate about creating efficient solutions,
      with expertise in embedded systems, web development, and problem-solving.
      I focus on delivering clean, scalable code and enjoy tackling complex challenges to drive innovation.
    </p>
  </section>
);

function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("nav-active");
}

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      const fetchedSkills = await fetchSkills();
      setSkills(fetchedSkills || []);
    };
    loadSkills();
  }, []);

  const skillIcons = [C,Cpp,DS,HTML,CSS,PG];

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              {/* Skill Icon */}
              <img src={skillIcons[index % skillIcons.length]} alt={skill.name} className="skill-icon" />
              <p>{skill.name}</p>
            </div>
          ))
        ) : (
          <p>Loading skills...</p>
        )}
      </div>
    </section>
  );
};


const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const loadEducation = async () => {
      const fetchedEducation = await fetchEducation();
      setEducation(fetchedEducation || []);
    };
    loadEducation();
  }, []);

  // Assign icons to education stages
  const icons = [asset1, asset2, asset3];

  return (
    <section id="education">
      <h2>Education</h2>

      {/* Education Cards */}
      <div className="education-grid">
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div className="education-card" key={index}>
              {/* Education Icon inside each card */}
              <img src={icons[index % icons.length]} alt="Education Icon" className="edu-icon" />
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p> 
              <div className="duration">
              <p>{edu.duration}</p> 
              </div>  
            </div>
          ))
        ) : (
          <p>Loading education details...</p>
        )}
      </div>
    </section>
  );
};

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
          projects.map((project, index) => (
            <div className="project" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {/* <a href={project.link || "#"} className="btn">View Details</a> */}
            </div>
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact">
    <h2>Contact Me</h2>
    <p>Let's get in touch!</p>
    <a 
      href="https://mail.google.com/mail/?view=cm&fs=1&to=varunshaji45@gmail.com" 
      className="btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      Send an Email
    </a>
    <div className="social-icons">
        <a href="https://github.com/varun-git2001" target="_blank" rel="noopener noreferrer">
          <img src={git} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/varun-shaji-38a7a3274" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/_varun.insta_?igsh=ZnF6MnRnNzQ2NDUx" target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" />
        </a>
      </div>
  </section>
);

const Footer = () => (
  <footer>
  </footer>
);

export default App;
