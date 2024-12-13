import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/hover_box2.css'; // 用於引入CSS
import candidate_logo from '../assets/homepage/candidate.svg'
const HoverBox2 = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/register/applicant')
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onClick={handleClick}
      className="hover-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text ${isHovered ? 'hidden' : ''}`}>
          <h3>Register as a applicant</h3>
          <p>For searching jobs</p>
          <img id="candidate_logo" src={candidate_logo} alt="Candidate Icon" />
      </div>
      <div className={`image2 ${isHovered ? 'visible' : ''}`} />
    </div>
  );
};

export default HoverBox2;