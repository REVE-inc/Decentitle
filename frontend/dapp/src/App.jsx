import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ad from './pages/Ad';
import Applicant from './pages/applicant';
import ReferralPage from './pages/referal';
import CompanyProfile from './pages/companyinfo';
import Company from './pages/company';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ad" element={<Ad />} />
                <Route path="/company" element={<Company />} />
                <Route path="/applicant" element={<Applicant />} />
                <Route path="/referal" element={<ReferralPage />} />
                <Route path="/companyinfo/:companyid" element={<CompanyProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
