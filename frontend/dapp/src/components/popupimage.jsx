import React, { useState, useEffect } from 'react';

const PicPopupPlayer = ({ adId, onClose }) => {
  const [picUrl, setpicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseURL = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (!adId) return;
    setLoading(true);
    fetch(`${baseURL}/ad/pictureid/${adId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        const { file } = data.image; 
        const picUrl = data.image;
        setpicUrl(picUrl);
      })
      .catch((error) => {
        console.error('Error fetching picture data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [adId]);

  if (!adId) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        {loading && <div>載入中...</div>}
        {!loading && picUrl && (
          <img style={styles.image} src={picUrl} />
        )}
      </div>
    </div>
  );
};

// 示例簡單CSS樣式，可依需求調整
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    position: 'relative',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '90%',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#eee',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
    width: '30px',
    height: '30px',
    textAlign: 'center'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '8px'
  }
};

export default PicPopupPlayer;
