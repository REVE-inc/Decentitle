import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const companyData = {
  name: "Tech Innovators Inc.",
  icon: "https://example.com/company-icon.png",
  intro: "Tech Innovators Inc. 致力於發展前瞻性科技解決方案，運用雲端服務、AI、區塊鏈技術，提供客戶高效且創新的產品。",
  jobs: [
    {
      title: "前端工程師",
      description: "負責前端功能開發、效能優化、維護與測試，確保使用者介面順暢。",
      requirements: ["熟悉 React.js", "具備前端效能優化經驗", "理解 RESTful API 整合"]
    },
    {
      title: "後端工程師",
      description: "負責後端系統的設計、開發與維護，確保服務穩定性與高可擴充性。",
      requirements: ["熟悉 Node.js", "了解資料庫 (MySQL, MongoDB)", "具備 CI/CD 經驗"]
    }
  ],
  benefits: [
    "彈性工時",
    "年終分紅",
    "員工教育訓練補助",
    "完善的健康檢查制度",
    "免費午餐與零食吧"
  ],
  salary: {
    range: "NTD 50,000 - 120,000 / 月",
    note: "薪資依經驗與技能調整，並提供定期調薪制度。"
  },
  environmentImages: [
    "https://example.com/env1.jpg",
    "https://example.com/env2.jpg",
    "https://example.com/env3.jpg"
  ]
};

const CompanyProfile = () => {
  const { companyid } = useParams();
  const {IData, setIData} = useState(companyid);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src={companyData.icon} alt="Company Icon" style={{ width: '80px', height: '80px', marginRight: '20px' }} />
        <h1 style={{ fontSize: '2em', margin: 0 }}>{companyData.name}</h1>
      </header>
      <section style={{ marginBottom: '20px' }}>
        <h2>公司簡介</h2>
        <h3>{companyid}</h3>
        <p>{companyData.intro}</p>
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h2>目前職缺</h2>
        {companyData.jobs.map((job, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <h3 style={{ margin: '10px 0' }}>{job.title}</h3>
            <p>{job.description}</p>
            <strong>需求條件：</strong>
            <ul>
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h2>員工福利</h2>
        <ul>
          {companyData.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
        </ul>
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h2>薪資範圍</h2>
        <p><strong>薪資：</strong>{companyData.salary.range}</p>
        <p><em>{companyData.salary.note}</em></p>
      </section>
      <section style={{ marginBottom: '20px' }}>
        <h2>工作環境</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {companyData.environmentImages.map((imgUrl, i) => (
            <img key={i} src={imgUrl} alt={`Environment ${i+1}`} style={{ width: '250px', height: 'auto', borderRadius: '5px' }}/>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyProfile;
