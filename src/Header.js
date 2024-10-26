// Header.js
import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Where in the World?</h1>
      </Link>
    </header>
  );
}

export default Header;
