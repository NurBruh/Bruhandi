import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Header.css';

const Header = ({ sany = 0 }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-link-wrapper">
          <span className="header-title" style={{ cursor: 'pointer' }}>
            BAHANDI
          </span>
        </Link>
        <nav className="header-nav header-nav-width">
          <Link to="/" className="header-link-wrapper">
            <span className="header-link">
              Бургеры
            </span>
          </Link>
          <Link to="/drinks" className="header-link-wrapper">
            <span className="header-link">
              Напитки
            </span>
          </Link>
          <span className="header-link">Комбо</span>
          <Link to="/cart" className="header-link-wrapper">
            <span className="header-cart">
              Корзина
              {sany > 0 && <span className="header-cart-badge">{sany}</span>}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
