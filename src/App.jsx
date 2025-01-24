import { useState } from 'react';
import './App.css';
import profile from './assets/varun.jpg';

function App() 
{
  // State to control which section is displayed (for Contact and Gallery)
  const [activeSection, setActiveSection] = useState(null);

  // Function to switch between sections based on the clicked link
  const showSection = (section) => {
    setActiveSection(section);
    if (section === 'contact') {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    } 
    else if (section === 'gallery') {
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
    else if (section === 'skills') {
      document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <h1>My Portfolio</h1>
          <ul className="nav-links">
            <li><a href="#contact" onClick={() => showSection('contact')}>Contact</a></li>
            <li><a href="#gallery" onClick={() => showSection('gallery')}>Gallery</a></li>
            <li><a href="#skills" onClick={() => showSection('skills')}>Skills</a></li>
          </ul>
        </nav>
      </header>

      {/* About Me */}
      <section id="about" className="about">
        <div className="profile-container">
          <img className="profile-pic" src={profile} alt="Profile" />
          <div className="bio">
            <h2>About Me</h2>
            <p>
              Hi, I'm Varun, a Software engineer with a passion for problem-solving.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <h3>Project 1</h3>
            <p></p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p></p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <h2>Education</h2>
        <p></p>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <h2>Skills</h2>
        <p></p>
      </section>

      {/* Conditional Rendering for Contact and Gallery */}
      {activeSection === 'contact' && (
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p></p>
        </section>
      )}

      {activeSection === 'gallery' && (
        <section id="gallery" className="section">
          <h2>Gallery</h2>
          <p>A gallery of your work or other relevant images.</p>
        </section>
      )}

      <footer className="footer">
        <p>&copy; 2025 Varun. All rights reserved.</p>
        <p>
          <a href="https://github.com/varun-git2001" target="_blank" rel="noopener noreferrer">
            GitHub
          </a> |  
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
