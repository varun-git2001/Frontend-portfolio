import React, { useEffect, useState } from "react";
import { fetchSkills } from "../Connect/Api";
import C from "../assets/C.png";
import Cpp from "../assets/C++.png";
import DS from "../assets/DS.png";
import HTML from "../assets/HTML.png";
import PG from "../assets/PG.png";
import CSS from "../assets/CSS.png";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      const fetchedSkills = await fetchSkills();
      setSkills(fetchedSkills || []);
    };
    loadSkills();
  }, []);

  const skillIcons = [C, Cpp, DS, HTML, CSS, PG];

  return (
    <section id="skills">
      <h2 className="heading">Skills</h2>
      <div className="skills-grid">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="skill-card" key={index}>
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

export default Skills;
