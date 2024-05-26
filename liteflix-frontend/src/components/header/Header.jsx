import { useState, useRef } from 'react';
import useHeaderHeight from '../../hooks/headerHeight';
import Menu from '../menu/Menu';
import './header.css';
import menu from '../../assets/svgs/menu.svg';
import avatar from '../../assets/images/avatar.png';
import cross from '../../assets/svgs/cross.svg';
import notifications from '../../assets/svgs/notifications.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const headerHeight = useHeaderHeight(headerRef);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto'; //make app unscrollable if menu is open
  };

  return (
    <header
      ref={headerRef}
      className={`header ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <button className="menu-button" onClick={toggleMenu}>
        <img
          src={isMenuOpen ? cross : menu}
          alt={isMenuOpen ? 'Cerrar' : 'Menu'}
        />
      </button>
      <div className="logo">
        <span className="text-bold">LITE</span>
        <span className="text-normal">FLIX</span>
      </div>
      <div className="notifications">
        <img src={notifications} alt="Notifications" />
      </div>
      <div className="user-profile">
        <img src={avatar} alt="User Profile" />
      </div>
      {isMenuOpen && (
        <Menu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          headerHeight={headerHeight}
        />
      )}
    </header>
  );
};

export default Header;
