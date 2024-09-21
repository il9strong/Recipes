import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    setIsMenuOpen(false);
    document.body.style.overflow = 'visible';
  };

  const isBlackText = location.pathname === '/recipes' || location.pathname === '/ingredients' || location.pathname.startsWith('/recipe');
  const linkClass = isBlackText ? 'head__link head__link_black' : 'head__link';
  const menuIconSrc = isBlackText ? '/img/menu/menu_black.svg' : './img/menu/menu.svg';

  return (
    <header className="head">
      <div className='burger-menu' id="burger-menu" style={{ display: isMenuOpen ? 'flex' : 'none' }}>
        <button className="menu-cross" onClick={toggleMenu}><img src="/img/menu/cross.svg" alt="close menu"/></button>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Главная</Link></li>
          <li><Link to="/recipes" onClick={toggleMenu}>Рецепты</Link></li>
          <li><Link to="/ingredients" onClick={toggleMenu}>Ингредиенты</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile" onClick={toggleMenu}>Профиль</Link></li>
              <li><div onClick={handleLogout}>Выйти</div></li>
            </>
          ) : (
            <>
              <li><Link to="/auth" onClick={toggleMenu}>Войти</Link></li>
              <li><Link to="/registration" onClick={toggleMenu}>Регистрация</Link></li>
            </>
          )}
        </ul>
      </div>
      <div className="container-head">
        <Link to="/" className="head__logo">
          <img src="/img/menu/logo.svg" alt="logo"/>
        </Link>
        <button className="menu-icon" onClick={toggleMenu}><img src={menuIconSrc} alt="menu"/></button>
        <div className="head__menu">
          <ul className="head__links">
            <li><Link to="/" className={linkClass}>Главная</Link></li>
            <li><Link to="/recipes" className={linkClass}>Рецепты</Link></li>
            <li><Link to="/ingredients" className={linkClass}>Ингредиенты</Link></li>
          </ul>
        </div>
        <div className="head__auth">
          {isAuthenticated ? (
            <>
              <Link to="/profile"><button className="head__button3 button">Профиль</button></Link>
              <button onClick={handleLogout} className="head__button2 button">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/auth"><button className="head__button1 button">Войти</button></Link>
              <Link to="/registration"><button className="head__button2 button">Регистрация</button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
