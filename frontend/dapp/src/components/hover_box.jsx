import React, { useState } from 'react';
import '../styles/hover_box.css'; // 用於引入CSS
import company_logo from '../assets/homepage/company.svg'
const HoverBox = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hover-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text ${isHovered ? 'hidden' : ''}`}>
        <h3>Register as a company</h3>
        <p>For recruiting workers</p>
        <img id="company_logo" src={company_logo} alt="Company Icon" />
      </div>
      <div className={`image ${isHovered ? 'visible' : ''}`} />
    </div>
  );
};

export default HoverBox;