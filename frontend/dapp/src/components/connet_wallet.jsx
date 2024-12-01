import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWalletButton = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // 請求用戶授權連結
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setWalletAddress(account);
        if (onConnect) {
          onConnect(account);
        }
      } catch (error) {
        console.error("連接錢包時出錯：", error);
      }
    } else {
      alert("請安裝 MetaMask 或其他支持以太坊的錢包擴展！");
    }
  };

  return (
    <button
      onClick={connectWallet}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {walletAddress ? `已連結: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "連結錢包"}
    </button>
  );
};

export default ConnectWalletButton;
