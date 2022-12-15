import React from 'react';
import { Link } from 'react-router-dom';

export default function Header () {
  return (
    <div className="header-container">
      <h1 id="pizza-title">LAMBDA EATS</h1>
      <Link to="/" id="home-link">Anasayfa</Link>
    </div>
  );
}