import React, { useState } from 'react';

const jobs = [
  { id: 1, title: "前端工程師", company: "ABC公司" },
  { id: 2, title: "後端工程師", company: "XYZ公司" },
  { id: 3, title: "數據分析師", company: "DataCorp" }
];

function ReferralPage() {
  const [referralLinks, setReferralLinks] = useState({});

  const generateReferralLink = (jobId) => {
    // 模擬產生推薦連結的行為，實際上可能要呼叫後端 API 或計算邏輯
    const link = `https://example.com/referral?jobId=${jobId}`;
    setReferralLinks((prev) => ({ ...prev, [jobId]: link }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>工作推薦頁面</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {jobs.map((job) => (
          <div 
            key={job.id} 
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <button 
              onClick={() => generateReferralLink(job.id)}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                cursor: 'pointer'
              }}
            >
              產生推薦連結
            </button>
            {referralLinks[job.id] && (
              <div style={{ marginTop: '10px' }}>
                <strong>推薦連結：</strong>
                <a href={referralLinks[job.id]} target="_blank" rel="noopener noreferrer">
                  {referralLinks[job.id]}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferralPage;
