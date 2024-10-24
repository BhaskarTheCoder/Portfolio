import "./skills.css";
import React from "react";

const Backend = () => {
  return (
    <div className="skills_content">
      <h3 className="skills_title">Backend Developer</h3>
      <div className="skills_box">
        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Java</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Python</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>

            <div>
              <h3 className="skills_name">NodeJS</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
        </div>
        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Spring Boot</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Firebase</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Django</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backend;
