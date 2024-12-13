import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Company.css'; 
import JobList from '../components/JobList.jsx';
import Wallet from '../components/Wallet.jsx';
import Advertisement from '../components/Advertisement.jsx';
import Certifications from '../components/Certifications.jsx';

function Company() {
  return (
    <div className="App">
      {/* Header 區塊 */}
      <header className="header">
        <h1>Flying Music Inc.</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/candidate">Candidate</Link>
          <Link to="/company">Company</Link>
        </nav>
      </header>

      {/* Main 內容區塊 */}
      <div className="app-content">
        {/* 左半邊：Job List */}
        <div className="left-panel">
          <JobList />
        </div>

        {/* 右半邊：Wallet, Advertisement, Certifications */}
        <div className="right-panel">
          <div className="right-top">
            <Wallet />
          </div>
          <div className="right-middle">
            <Advertisement />
          </div>
          <div className="right-bottom">
            <Certifications />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
