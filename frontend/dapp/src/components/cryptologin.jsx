// CryptoLogin.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

function CryptoLogin() {
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginProcess = async () => {
    try {
      // 檢查是否安裝錢包
      if (typeof window.ethereum === 'undefined') {
        setMessage('請先安裝 MetaMask 或其他以太坊錢包擴充功能。');
        return;
      }

      // 連結錢包
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (!accounts || accounts.length === 0) {
        setMessage('無法取得錢包地址。');
        return;
      }
      const cryptoAddress = accounts[0];
      setCryptoAddress(cryptoAddress);
      setMessage(`已連結錢包地址: ${cryptoAddress}`);

      // 請求 nonce
      const nonceResponse = await axios.post('http://127.0.0.1:8000/user/request-login-nonce/', {
        crypto_address: cryptoAddress,
      });
      if (nonceResponse.status !== 200) {
        setMessage('請求 nonce 時發生錯誤。');
        return;
      }
      const { nonce } = nonceResponse.data;
      setMessage('已取得 nonce，請簽署。');

      // 簽署 nonce
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [nonce, cryptoAddress],
      });
      setMessage('已成功簽署 nonce。');

      // 登入
      const loginResponse = await axios.post('http://127.0.0.1:8000/user/crypto-login/', {
        crypto_address: cryptoAddress,
        nonce: nonce,
        signature: signature,
      });
      if (loginResponse.status === 200) {
        setMessage('登入成功！');
        const { access, refresh } = loginResponse.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
      } else {
        setMessage('登入時發生錯誤。');
      }
    } catch (error) {
      console.error(error);
      setMessage('流程中發生錯誤。');
    }
  };

  return (
    <div>
      <h1>Crypto Wallet 登入</h1>
      <button onClick={handleLoginProcess}>連結錢包並登入</button>
      {cryptoAddress && <p>已連結錢包地址：{cryptoAddress}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CryptoLogin;
