import React from "react";
import "../styles/Certifications.css";

const Certifications = () => {
  return (
    <div className="certifications-container">
      <h2>Certifications Request</h2>
      <div className="cert-status">
        <div>
          <h3>Done</h3>
          <p>15</p>
        </div>
        <div>
          <h3>To be checked</h3>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
