import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/applicant">Applicant</Link>
      <Link to="/company">Company</Link>
      <Link to="/ad">AD</Link>
    </nav>
  );
}

export default Navbar;