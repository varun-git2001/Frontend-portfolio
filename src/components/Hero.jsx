import React from "react";
import git from "../assets/github.png";
import linkedin from "../assets/in.png";
import insta from "../assets/insta.png";
import mail from "../assets/mail.png";

const Hero = () => (
  <section id="hero">
    <div className="hero-container">
      <div className="hero-text">
        <h1>
          Hi, I'm <span>Varun</span>
        </h1>
        <p className="typing">Associate Software Engineer</p>
        <div className="links">
          <a href="/projects" className="btn">My Works</a>
          <a href="https://drive.google.com/file/d/138BigC2esvqr3OypoSsq7Uoh7-TTHrdl/view?usp=drive_link" className="btn">Resume</a>
        </div>
        </div>
        </div>
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
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=varunshaji45@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={mail} alt="Mail" />
          </a>
        </div>
     

      <div className="hero-image">
        <img src="http://localhost:8080/images/final1.png" alt="Backend Image" width="450" />
      
    </div>
  </section>
);

export default Hero;
