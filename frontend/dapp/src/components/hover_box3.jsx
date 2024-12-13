import React, { useState } from 'react';
import '../styles/hover_box3.css'; // 用於引入CSS
import { useNavigate } from 'react-router-dom';
import referrer_logo from '../assets/homepage/referrer.png'
const HoverBox3 = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/register/referrer')
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onClick={handleClick}
      className="hover-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text ${isHovered ? 'hidden' : ''}`}>
        <h3>Register as a company</h3>
        <p>For recruiting workers</p>
        <img id="referrer_logo" src={referrer_logo} alt="referrer Icon" />
      </div>
      <div className={`image3 ${isHovered ? 'visible' : ''}`} />
    </div>
  );
};

export default HoverBox3;