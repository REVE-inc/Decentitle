import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  // 處理檔案選擇
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 處理上傳
  const handleUpload = async () => {
    if (!file) {
      alert('請選擇一個視頻檔案！');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/ad/uploadvideo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          // 計算並設置進度
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      alert('上傳成功！');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('上傳失敗：', error);
      alert('上傳失敗，請稍後再試！');
    }
  };

  return (
    <div style={styles.container}>
      <h3>上傳視頻</h3>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button id="uploadvidadbtn" onClick={handleUpload} style={styles.button}>上傳</button>
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>
      <p>{progress}%</p>
    </div>
  );
};

// CSS 樣式
const styles = {
  container: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    margin: '20px auto',
  },
  button: {
    margin: '10px 0',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  progressBarContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: '#f3f3f3',
    borderRadius: '5px',
    overflow: 'hidden',
    margin: '10px 0',
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#4caf50',
  },
};

export default VideoUpload;
