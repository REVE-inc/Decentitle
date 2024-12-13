import React from "react";
import "../styles/Advertisement.css";

const Advertisement = () => {
  return (
    <div className="advertisement-container">
      <h2>Advertisement</h2>
      <div className="ad-card">
      <div className="ad-text">
        <p>50 advertisement tokens</p>
        <span>5 Tcoin</span>
        </div>
        <button>Purchase</button>
      </div>

      <div className="ad-card">
      <div className="ad-text">
        <p>100 advertisement tokens</p>
        <span>9 Tcoin</span>
        </div>
        <button>Purchase</button>
      </div>
    </div>
  );
};

export default Advertisement;
