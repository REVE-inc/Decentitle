import React from 'react';
import { Link } from 'react-router-dom';
import dappicon from '../assets/homepage/dappicon.png';

function Navbar() {
  return (
    <nav>
      <img className='dappicon' src={dappicon} />
      <Link to="/">Home</Link>
      <Link to="/applicant">Applicant</Link>
      <Link to="/company">Company</Link>
      <Link to="/ad">AD</Link>
      <Link to="/referal">referal</Link>
    </nav>
  );
}

export default Navbar;