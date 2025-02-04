
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navigation Links */}
      <nav className={menuOpen ? "active" : ""}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/skills" onClick={() => setMenuOpen(false)}>Skills</Link></li>
          <li><Link to="/education" onClick={() => setMenuOpen(false)}>Education</Link></li>
          <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
