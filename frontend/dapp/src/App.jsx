import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ad from './pages/Ad';
import Applicant from './pages/applicant';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ad" element={<Ad />} />
                <Route path="/applicant" element={<Applicant />} />
            </Routes>
        </Router>
    );
}

export default App;
