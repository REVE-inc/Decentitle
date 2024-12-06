import React from 'react';
import '../styles/Applicant.css';

function Applicant() {
  return (
    <div className="App">
      {/* Header Component */}
      <header className="header">
        <div className="profile">
          <img className="profile-image" src="richard-sanchez.jpg" alt="Richard Sanchez" />
          <div>
            <h1>RICHARD SANCHEZ</h1>
            <p>MARKETING MANAGER</p>
          </div>
        </div>
      </header>

      {/* Container Component */}
      <div className="container">
        {/* Wallet Section */}
        <div className="section">
          <div className="wallet-total">$30</div>
          <div className="wallet-item">
            <span>pay $10 to Borellus Studio</span>
            <span>★</span>
          </div>
          <div className="wallet-item">
            <span>pay $10 to Fauget Studio</span>
            <span>★</span>
          </div>
          <div className="wallet-item">
            <span>pay $10 to Wardiere University</span>
            <span>★</span>
          </div>
          <a href="#" className="deposit">See more</a>
        </div>

        {/* Locked Certification Section */}
        <div className="section">
          <div className="section-title">Locked Certification</div>
          <div className="locked-certification">
            <img src="lock.svg" alt="Lock" />
            <div>
              <p>Studio Shodew</p>
              <a href="#">Apply for the certification</a>
            </div>
          </div>
          <div className="locked-certification">
            <img src="lock.svg" alt="Lock" />
            <div>
              <p>Wadiere University</p>
              <a href="#">Apply for the certification</a>
            </div>
          </div>
        </div>

        {/* Recommended Jobs Section */}
        <div className="section">
          <div className="section-title">Recommended Jobs</div>
          <div className="recommended-jobs">
            <div className="job-item">
              <p>1. Job title</p>
              <p>Company name</p>
            </div>
            <div className="job-item">
              <p>2. Job title</p>
              <p>Company name</p>
            </div>
            <div className="job-item">
              <p>3. Job title</p>
              <p>Company name</p>
            </div>
          </div>
          <div className="pay-to-unlock">
            Pay to unlock
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicant;
