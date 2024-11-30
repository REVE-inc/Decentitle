import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/home_navbar';

function Home() {
  return (
    <div className="App">
      <header className="header">
        <input type="text" className="search-bar" placeholder="search" />
        <Navbar />
      </header>

      <div className="login-section">
        <h2>Log in</h2>
        <input type="text" placeholder="e-mail or username" className="input-field" />
        <input type="password" placeholder="password" className="input-field" />
        <button className="login-button">Log in</button>
      </div>

      <div className="register-section">
        <div className="register-box">
          <h3>Register as a company</h3>
          <p>For recruiting workers</p>
          <img src="company-icon.png" alt="Company Icon" />
        </div>
        <div className="register-box">
          <h3>Register as a candidate</h3>
          <p>For searching jobs</p>
          <img src="candidate-icon.png" alt="Candidate Icon" />
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-box">
          <h4>Company</h4>
          <p>1,033</p>
        </div>
        <div className="stats-box">
          <h4>Candidate</h4>
          <p>4,033</p>
        </div>
        <div className="stats-box">
          <h4>Jobs</h4>
          <p>403</p>
        </div>
      </div>

      <div className="popular-section">
        <h4>Most popular company</h4>
        <div className="popular-companies">
          <img src="facebook-icon.png" alt="Facebook" />
          <img src="ea-icon.png" alt="EA" />
          <img src="fiverr-icon.png" alt="Fiverr" />
        </div>
      </div>
    </div>
  );
}

export default Home;
