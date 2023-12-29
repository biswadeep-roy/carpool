import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navbarStyle = {
    background: 'linear-gradient(to right, #4b6cb7, #182848)',
    color: 'white',
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
        <Link className="navbar-brand" to="/" style={{ color: 'white' }}>
          Vit Carpool
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          {isNavOpen ? <FaTimes style={{ color: 'white' }} /> : <FaBars style={{ color: 'white' }} />}
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'white' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/findcarpoolers" style={{ color: 'white' }}>
                Find Carpoolers
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
