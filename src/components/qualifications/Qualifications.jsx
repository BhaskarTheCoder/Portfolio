import React, { useState } from "react";
import "./qualifications.css";

const Qualifications = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <section className="qualifications section">
      <h2 className="section_title">Qualifications</h2>
      <span className="section_subtitle">My Personal Journey</span>

      <div className="qualifications_container container">
        <div className="qualifications_tabs">
          <div
            className={
              toggleState === 1
                ? "qualifications_button qualifications_active button-flex"
                : "qualifications_button button-flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification_icon"></i>{" "}
            Education
          </div>

          <div
            className={
              toggleState === 2
                ? "qualifications_button qualifications_active button-flex"
                : "qualifications_button button-flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification_icon"></i>{" "}
            Experience
          </div>
        </div>

        <div className="qualifications_sections">
          <div
            className={
              toggleState === 1
                ? "qualifications_content qualifications_content-active"
                : "qualifications_content"
            }
          >
            <div className="qualifications_data">
              <div>
                <h3 className="qualifications_title">
                  Master of Science - Computer Science
                </h3>
                <span className="qualifications_subtitle">
                  University of North Texas
                </span>
                <div className="qualifications_calendar">
                  <i className="uil uil-calendar-alt"></i>
                  Aug 2023 - Dec 2024
                </div>
              </div>
              <div>
                <span className="qualifications_rounder"></span>
                <span className="qualifications_line"></span>
              </div>
            </div>

            <div className="qualifications_data">
              <div>
                <h3 className="qualifications_title">
                  Bachelor of Technology - Computer Science and Engineering
                </h3>
                <span className="qualifications_subtitle">
                  Sphoorthy Engineering College
                </span>
                <div className="qualifications_calendar">
                  <i className="uil uil-calendar-alt"></i>
                  Aug 2018 - Aug 2022
                </div>
              </div>
              <div>
                <span className="qualifications_rounder"></span>
                <span className="qualifications_line"></span>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "qualifications_content qualifications_content-active"
                : "qualifications_content"
            }
          >
            <div className="qualifications_data">
              <div></div>
              <div>
                <span className="qualifications_rounder"></span>
                <span className="qualifications_line"></span>
              </div>
              <div>
                <h3 className="qualifications_title">
                  Junior Software Test Automation Engineer
                </h3>
                <span className="qualifications_subtitle">
                  EPAM Systems Private Limited, India.
                </span>
                <div className="qualifications_calendar">
                  <i className="uil uil-calendar-alt"></i>
                  Feb 2022 - Jun 2023
                </div>
              </div>
            </div>

            <div className="qualifications_data">
              <div></div>
              <div>
                <span className="qualifications_rounder"></span>
                <span className="qualifications_line"></span>
              </div>
              <div>
                <h3 className="qualifications_title">Web Developer</h3>
                <span className="qualifications_subtitle">
                  Samarth IT Solutions.
                </span>
                <div className="qualifications_calendar">
                  <i className="uil uil-calendar-alt"></i>
                  Jun 2021 - August 2021
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
