import React from 'react';
import JobList from '../components/JobList';
import Wallet from '../components/Wallet';
import Advertisement from '../components/Advertisement';
import Certifications from '../components/Certifications';

function Company() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Flying Music Inc.</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Candidate</a>
          <a href="#">Company</a>
        </nav>
      </header>

      <div className="app-content">
        <div className="left-panel">
          <JobList />
        </div>
        <div className="right-panel">
          <Wallet />
          <Advertisement />
          <Certifications />
        </div>
      </div>
    </div>
  );
};

export default Company;
