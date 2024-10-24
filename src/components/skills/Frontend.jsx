import "./skills.css";
import React from "react";

const Frontend = () => {
  return (
    <div className="skills_content">
      <h3 className="skills_title">Front Engineer</h3>
      <div className="skills_box">
        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Javascript</h3>
              <span className="skills_level">Expert</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">HTML</h3>
              <span className="skills_level">Intermidate</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">CSS</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>
        </div>
        <div className="skills_group">
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">React</h3>
              <span className="skills_level">Intermediate</span>
            </div>
          </div>

          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Anuglar</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>
          <div className="skills_data">
            <i className="bx bx-badge-check"></i>
            <div>
              <h3 className="skills_name">Flutter</h3>
              <span className="skills_level">Basic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frontend;
