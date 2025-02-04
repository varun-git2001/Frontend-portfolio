import React, { useEffect, useState } from "react";
import { fetchEducation } from "../Connect/Api";
import asset1 from "../assets/College.svg";
import asset2 from "../assets/Secondary.png";
import asset3 from "../assets/School.png";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const loadEducation = async () => {
      const fetchedEducation = await fetchEducation();
      setEducation(fetchedEducation || []);
    };
    loadEducation();
  }, []);

  const icons = [asset1, asset2, asset3];

  return (
    <section id="education">
      {/* <h2 className="heading">Education</h2> */}
      <div className="education-grid">
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div className="education-card" key={index}>
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

export default Education;
