import React from "react";

import "./index.css";

const ProgressBar = ({ progress }) => (
  <div style={{ width: "100%" }}>
    <p style={{ marginBottom: "0.1rem" }}>Progress:</p>
    <div className="progress-bar">
      <div
        style={{
          width: `${progress || 1}%`,
          backgroundColor: "#4CAF50",
        }}
        className="progress-bar__progress"
      ></div>
      <p className="progress-bar__progress-text">{progress}%</p>
    </div>
  </div>
);

export default ProgressBar;
