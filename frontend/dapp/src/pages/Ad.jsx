import React, { useState } from 'react';
import '../styles/Ad.css';
import VideoUpload from '../components/VideoUpload';
import ImageUploader from '../components/picupload';
function Ad() {
  // 狀態管理
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    adType: '',
    adContent: null
  });

  // 廣告類型選項
  const adTypes = [
    { value: 'image', label: '首頁廣告' },
    { value: 'image', label: '用戶橫幅廣告' },
    { value: 'video', label: '跳出影片廣告' },
    { value: 'image', label: '跳出橫幅廣告' }
  ];

  // 處理輸入變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      case 'url':
        if (!formData.adContent) {
          alert('請輸入URL');
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

        {formData.adType === 'video' && (
          <VideoUpload />
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

        <button type="submit" className="submit-btn">
          提交廣告
        </button>
      </form>
    </div>
    </>
  );
}

export default Ad;