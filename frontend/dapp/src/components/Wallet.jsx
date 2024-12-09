import React from "react";
import "../styles/Wallet.css";

const Wallet = () => {
  return (
    <div className="wallet-container">
      <h2>My Wallet</h2>
      <div className="wallet-total">$10</div>
      <p>★ pay $5 (advertisements)</p>
      <p>★ receive $10 (certification fee)</p>
      <button className="wallet-button">Deposit</button>
    </div>
  );
};

export default Wallet;
