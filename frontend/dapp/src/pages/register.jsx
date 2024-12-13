import React, { useState, useEffect} from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function Register() {

  const navigate = useNavigate()

  const {userType} = useParams();
  console.log(userType)
  const roleMapping = {
    'applicant': 1,
    'company': 2,
    'referrer':3,
    'certification': 4
  };
  const defaultRole = roleMapping[userType] || 1;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(0);
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    // 當路由參數(userType) 改變時，同步更新角色
    setRole(defaultRole);
  }, [userType]);

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
        setIsWalletConnected(true);
        setMessage(`已連結錢包地址: ${accounts[0]}`);
      } else {
        setMessage('無法取得錢包地址。');
      }
    } catch (error) {
      console.error(error);
      setMessage('連接錢包時發生錯誤');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isWalletConnected || !cryptoAddress) {
      setMessage('請先連接錢包後再進行註冊');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/register/', {
        email,
        password,
        username,
        crypto_address: cryptoAddress,
        Role: role 
      });
      if (response.status === 201) {
        setMessage('註冊成功！');
        navigate('/verifywallet', {state: {email: email}});
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`註冊失敗: ${JSON.stringify(error.response.data)}`);
      } else {
        setMessage('註冊時發生錯誤');
      }
    }
  };

  return (
    <div>
      <h1>註冊</h1>
      {!isWalletConnected && (
        <button onClick={connectWallet}>連結錢包</button>
      )}
      {isWalletConnected && (
        <p>已使用錢包地址：{cryptoAddress}</p>
      )}

      <form onSubmit={handleRegister}>
        <div>
          <label>Email：</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password：</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>用戶名稱：</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <h3>角色: {userType}</h3>
        </div>
        {/* cryptoAddress 不需要在表單上顯示，前面已取得 */}
        <button type="submit">註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
