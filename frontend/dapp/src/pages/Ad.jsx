import React, { useState } from 'react';
import '../styles/Ad.css';
import VideoUpload from '../components/VideoUpload';
import ImageUploader from '../components/picupload';
import AdPopupPlayer from '../components/popupvideo';
function Ad() {


  const [showAd, setShowAd] = useState(false);
  const [adId, setAdId] = useState("f2e74c6d-e8db-49e2-b596-4fd28ebd680d"); // 預設測試ID


  // 狀態管理
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    adType: '',
    adContent: null
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);
  // 廣告類型選項
  const adTypes = [
    { value: 'image', label: '首頁廣告' },
    { value: 'image_user', label: '用戶橫幅廣告' },
    { value: 'video', label: '跳出影片廣告' },
    { value: 'image_popup', label: '跳出橫幅廣告' }
  ];

  // 處理輸入變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleCheck = async (unique_id) => {
    const response = await fetch('http://127.0.0.1:8000/ad/video/checkstatus/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unique_id: unique_id })
    });
    const data = await response.json();
    if (data.exists) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }
  // 處理檔案上傳
  const handleFileUpload = (e) => {
    setFormData(prev => ({
      ...prev,
      adContent: e.target.files[0]
    }));
  };

  // 提交表單
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 驗證表單
    if (!formData.name || !formData.symbol || !formData.adType) {
      alert('請填寫所有必填欄位');
      return;
    }

    // 根據廣告類型進行驗證
    switch(formData.adType) {
      case 'image':
        if (!formData.adContent || !formData.adContent.type.startsWith('image/')) {
          alert('請上傳圖片');
          return;
        }
        break;
      case 'video':
        if (!formData.adContent || !formData.adContent.type.startsWith('video/')) {
          alert('請上傳影片');
          return;
        }
        break;
      case 'text':
        if (!formData.adContent) {
          alert('請輸入文字廣告內容');
          return;
        }
        break;
    }

    // 模擬提交
    console.log('提交的廣告資料:', formData);
    alert('廣告已成功提交');
  };

  return (
    <>
    <div className="container">
      <h1>網頁廣告銷售平台</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>客戶名稱:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>廣告代號:</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>廣告類型:</label>
          <select
            name="adType"
            value={formData.adType}
            onChange={handleInputChange}
            required
          >
            <option value="">選擇廣告類型</option>
            {adTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {formData.adType === 'image' && (
          <ImageUploader />
        )}
        {formData.adType === 'image_user' && (
          <ImageUploader />
        )}
        {formData.adType === 'image_popup' && (
          <ImageUploader />
        )}
        {formData.adType === 'video' && (
          <VideoUpload onCheck={handleCheck} />
        )}

        {formData.adType === 'url' && (
          <div className="form-group">
            <label>輸入連結:</label>
            <input
              type="url"
              name="adContent"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                adContent: e.target.value
              }))}
              required
            />
          </div>
        )}

        {formData.adType === 'text' && (
          <div className="form-group">
            <label>文字廣告:</label>
            <textarea
              name="adContent"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                adContent: e.target.value
              }))}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={!buttonEnabled}>
          提交廣告
        </button>
      </form>
    </div>


    <div>
      <button onClick={() => setShowAd(true)}>顯示廣告</button>
      {showAd && (
        <AdPopupPlayer
          adId={adId}
          onClose={() => setShowAd(false)}
        />
      )}
    </div>

    </>
  );
}

export default Ad;