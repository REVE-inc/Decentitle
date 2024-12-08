import React from 'react';
import { useEffect } from 'react';
import '../styles/Home.css';
import Navbar from '../components/home_navbar';
import HoverBox from '../components/hover_box';
import HoverBox2 from '../components/hover_box2'
import ConnectWalletButton from '../components/connet_wallet';
import HoverBox3 from '../components/hover_box3';
function Home() {
  return (
    <div className="App">
      <header className="header">
        <input type="text" className="search-bar" placeholder="search" />
        <Navbar className="nav-bar" />
      </header>

      <div className="login-section">
        <h2>Log in</h2>
        <input type="text" placeholder="e-mail or username" className="input-field" />
        <input type="password" placeholder="password" className="input-field" />
        <button className="login-button">Log in</button>
        <ConnectWalletButton/>
      </div>

      <div className="register-section">
          <HoverBox />
          <HoverBox2 />
          <HoverBox3 />
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
        <h4>AD</h4>
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
