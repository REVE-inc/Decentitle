import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ad from './pages/Ad';
import Applicant from './pages/applicant';
import ReferralPage from './pages/referal';
import CompanyProfile from './pages/companyinfo';
import Company from './pages/company';
import Register from './pages/register'
import Verifywallet from './pages/verifywallet';
import Certification_page from './pages/certification_page';
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
                <Route path="/register/:userType" element={<Register />} />
                <Route path="/verifywallet" element={<Verifywallet />} />
                <Route path='/cetifi-institute' element={<Certification_page />} />
            </Routes>
        </Router>
    );
}

export default App;
