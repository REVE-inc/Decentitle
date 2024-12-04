import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // 處理圖片選擇
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // 預覽圖片
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // 處理圖片上傳
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post('http://127.0.0.1:8000/ad/uploadpic', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('Upload successful!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center' }}>
            <h3>Upload Image</h3>
            {preview && (
                <div style={{ marginBottom: '10px' }}>
                    <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
                </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Upload
            </button>
            {uploadStatus && <p style={{ marginTop: '10px', color: uploadStatus.includes('successful') ? 'green' : 'red' }}>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUploader;
