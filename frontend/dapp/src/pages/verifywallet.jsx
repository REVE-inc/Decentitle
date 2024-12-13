import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
function Verifywallet() {

  const [cryptoAddress, setCryptoAddress] = useState('');
  const [nonce, setNonce] = useState('');
  const [signature, setSignature] = useState('');
  const [message, setMessage] = useState('');

  const getemail = useLocation();
  const email = getemail.state
  const connectWallet = async () => {
      if (typeof window.ethereum === 'undefined') {
        setMessage('請先安裝 MetaMask 或其他以太坊錢包擴充功能。');
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        if (accounts && accounts.length > 0) {
          setCryptoAddress(accounts[0]);
          setMessage(`已連結錢包地址: ${accounts[0]}`);
        } else {
          setMessage('無法取得錢包地址。');
        }
      } catch (error) {
        console.error(error);
        setMessage('連接錢包時發生錯誤');
      }
    };


  const requestNonce = async () => {
    if (!cryptoAddress) {
      setMessage('請先連結錢包。');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/request-nonce/', {
        crypto_address: cryptoAddress,
        email: email.email
      });
      if (response.status === 200) {
        setNonce(response.data.nonce);
        setMessage('已取得 nonce，請簽署。');
      }
    } catch (error) {
      console.error(error);
      setMessage('請求 nonce 時發生錯誤。');
    }
  };


  const signNonce = async () => {
    if (!nonce) {
      setMessage('請先取得 nonce。');
      return;
    }
    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [nonce, cryptoAddress],
      });
      setSignature(signature);
      setMessage('已成功簽署 nonce。');
      const verifyResponse = await axios.post('http://127.0.0.1:8000/user/verify-signature/', {
          crypto_address: cryptoAddress,
          nonce: nonce,
          signature: signature,
          email: email.email
        });
    } catch (error) {
      console.error(error);
      setMessage('簽署 nonce 時發生錯誤。');
    }
  };
  return(
    <div>
    <h1>註冊並驗證錢包所有權</h1>
    {!cryptoAddress && (
      <button onClick={connectWallet}>連結錢包</button>
    )}
    {cryptoAddress && (
      <div>
        <p>已連結錢包地址：{cryptoAddress}</p>
        <button onClick={requestNonce}>取得 nonce</button>
      </div>
    )}
    {nonce && (
      <div>
        <p>Nonce: {nonce}</p>
        <button onClick={signNonce}>簽署 nonce</button>
      </div>
    )}
    {message && <p>{message}</p>}
  </div>
  );
};

export default Verifywallet