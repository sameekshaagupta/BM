import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(240, 240, 240, 0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'transparent',
    border: 'none',
    color: '#c0392b',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 2001
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '1.5rem',
    position: 'relative',
    padding: '1rem 2rem',
    margin: '0.5rem 0',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '50px',
    background: 'rgba(255, 255, 255, 0.7)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    ':hover': {
      background: 'rgba(192, 57, 43, 0.1)',
      color: '#c0392b',
      transform: 'scale(1.05)'
    }
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    color: '#c0392b',
    background: 'rgba(192, 57, 43, 0.1)',
    boxShadow: '0 4px 15px rgba(192, 57, 43, 0.2)'
  };

  const navSections = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Careers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div style={mobileMenuStyle}>
      <button 
        style={closeButtonStyle}
        onClick={() => setIsMenuOpen(false)}
        aria-label="Close menu"
      >
        <FiX />
      </button>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '2rem'
      }}>
        {navSections.map((section) => (
          <Link
            key={section.id}
            to={`/${section.id === 'home' ? '' : section.id}`}
            style={window.location.pathname === `/${section.id}` || 
                  (section.id === 'home' && window.location.pathname === '/') 
                  ? activeNavLinkStyle 
                  : navLinkStyle}
            onClick={() => setIsMenuOpen(false)}
          >
            {section.label}
          </Link>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        textAlign: 'center',
        color: '#333',
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} Blacksmith Mechatronics</p>
      </div>
    </div>
  );
};

export default MobileMenu;