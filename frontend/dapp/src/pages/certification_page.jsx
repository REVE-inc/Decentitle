import React from "react";
import "../styles/certification_page.css";

function Certification_page() {
    return (
        <div className="container">
        <header>
          <div className="nav">
            <span>Home</span>
            <span>Candidate</span>
            <span>Company</span>
            <input type="text" placeholder="search" />
            <span>多益 TOEIC</span>
          </div>
        </header>
  
        <main>
          <section className="certifications">
            <h2>Certifications Request</h2>
            <div className="certifications-header">
              <div className="title">多益 TOEIC</div>
              <div className="status">
                <span>Done</span>
                <span className="count">130</span>
                <span>To be checked</span>
                <span className="count">10</span>
              </div>
            </div>
            <div className="certifications-list">
              {[...Array(4)].map((_, index) => (
                <div className="certification-item" key={index}>
                  <div className="certification-info">
                    <h3>Sam Smith</h3>
                    <p>score : 780</p>
                  </div>
                  <div className="certification-actions">
                    <button className="detail-btn">detail</button>
                    <button className="check-btn">check</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          <section className="wallet">
            <h2>My wallet</h2>
            <div className="wallet-summary">
              <p>receive $10 (certification fee)</p>
              <p>receive $10 (certification fee)</p>
              <p>pay $5 (advertisements)</p>
            </div>
            <div className="wallet-balance">
              <span>Total</span>
              <div className="amount">$10</div>
              <button className="deposit-btn">deposit</button>
            </div>
            <div className="wallet-stake">
              <div className="amount">$70</div>
              <button className="stake-btn">stake</button>
              <button className="withdraw-btn">withdraw</button>
            </div>
          </section>
  
          <section className="advertisement">
            <h2>Advertisement</h2>
            <div className="ad-options">
              <div className="ad-item">
                <p>5 days advertisement</p>
                <span>$5</span>
                <button className="purchase-btn">Purchase</button>
              </div>
              <div className="ad-item">
                <p>10 days advertisement</p>
                <span>$9</span>
                <button className="purchase-btn">Purchase</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

export default Certification_page;
  