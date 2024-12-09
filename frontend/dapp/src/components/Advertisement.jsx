import React from "react";
import "../styles/Advertisement.css";

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      <h2>Advertisement</h2>
      <div className="ad-card">
        <p>5 days advertisement</p>
        <span>$5</span>
        <button>Purchase</button>
      </div>
      <div className="ad-card">
        <p>10 days advertisement</p>
        <span>$9</span>
        <button>Purchase</button>
      </div>
    </div>
  );
};

export default Advertisement;
