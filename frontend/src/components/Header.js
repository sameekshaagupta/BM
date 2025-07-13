import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Header.css'; // 👈 Import the CSS file

const Header = ({ scrollY }) => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle navigation with proper scroll timing
  const handleNavClick = (path, event) => {
    event.preventDefault(); // Prevent default Link behavior
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // If navigating to the same page, just scroll to top
    const targetPath = path === '/' ? '/' : `/${path}`;
    if (location.pathname === targetPath) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // For different pages, navigate first then scroll
    navigate(targetPath);
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  // Alternative approach: Scroll after route change
  useEffect(() => {
    // Scroll to top when route changes (except on initial load)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  useEffect(() => {
    setIsLoaded(true);
    let scrollTimer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

const headerStyle = {
  background: scrollY > 50
    ? 'linear-gradient(135deg, rgba(240, 240, 240, 0.98) 0%, rgba(245, 245, 255, 0.95) 50%, rgba(240, 240, 240, 0.98) 100%)'
    : 'rgba(255, 255, 255, 1)', // Changed from transparent to solid white
  backdropFilter: scrollY > 50 ? 'blur(30px)' : 'none', // Only apply blur when scrolled
  WebkitBackdropFilter: scrollY > 50 ? 'blur(30px)' : 'none',
  border: scrollY > 50
    ? '1px solid rgba(192, 57, 43, 0.3)'
    : '1px solid rgba(255, 255, 255, 0.1)',
  borderTop: 'none',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  padding: scrollY > 50 ? '0.5rem 0' : '0.8rem 0',
  transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  boxShadow: scrollY > 50
    ? `0 15px 35px rgba(0, 0, 0, 0.2),
       0 0 50px rgba(192, 57, 43, 0.2),
       0 0 0 ${isScrolling ? '3px' : '0px'} rgba(192, 57, 43, 0.1)`
    : '0 2px 10px rgba(0, 0, 0, 0.05)', // Lighter shadow for default state
  transform: isLoaded ? 'translateY(0)' : 'translateY(-100%)',
  opacity: isLoaded ? 1 : 0,
  willChange: 'transform, opacity, box-shadow, padding, background'
};

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    position: 'relative'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.4rem',
    fontWeight: '800',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    transform: hoveredElement === 'logo'
      ? 'translateY(-3px) scale(1.05) perspective(500px) rotateX(5deg)'
      : 'translateY(0) scale(1)',
    textDecoration: 'none',
    color: 'inherit',
    willChange: 'transform, filter'
  };

  const logoImageStyle = {
    width: scrollY > 50 ? '60px' : '60px',
    height: scrollY > 50 ? '60px' : '60px',
    marginRight: '0.8rem',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    position: 'relative',
    zIndex: 1,
    transformStyle: 'preserve-3d',
    willChange: 'transform'
  };

  const logoGlowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: hoveredElement === 'logo' ? '60px' : '50px',
    height: hoveredElement === 'logo' ? '60px' : '50px',
    borderRadius: '50%',
    filter: 'blur(15px)',
    background: 'rgba(192, 57, 43, 0.4)',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    opacity: hoveredElement === 'logo' ? 1 : 0,
    zIndex: 0
  };

  const getNavLinkStyle = (section) => ({
    textDecoration: 'none',
    color: location.pathname === `/${section}` || (section === 'home' && location.pathname === '/')
      ? '#c0392b'
      : '#333',
    fontWeight: '600',
    fontSize: '0.9rem',
    position: 'relative',
    padding: '0.6rem 1rem',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    textShadow: location.pathname === `/${section}` || (section === 'home' && location.pathname === '/')
      ? '0 0 10px rgba(192, 57, 43, 0.5)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    background: hoveredElement === section
      ? 'rgba(192, 57, 43, 0.1)'
      : (location.pathname === `/${section}` || (section === 'home' && location.pathname === '/'))
        ? 'rgba(192, 57, 43, 0.05)'
        : 'transparent',
    backdropFilter: hoveredElement === section ? 'blur(10px)' : 'none',
    transform: hoveredElement === section
      ? 'translateY(-2px) scale(1.05) perspective(500px) rotateX(5deg)'
      : 'translateY(0) scale(1)',
    boxShadow: hoveredElement === section
      ? '0 8px 25px rgba(192, 57, 43, 0.2)'
      : (location.pathname === `/${section}` || (section === 'home' && location.pathname === '/'))
        ? '0 4px 15px rgba(192, 57, 43, 0.1)'
        : 'none',
    willChange: 'transform, background, box-shadow',
    overflow: 'hidden'
  });

  const navLinkUnderlineStyle = (section) => ({
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: location.pathname === `/${section}` || (section === 'home' && location.pathname === '/')
      ? '80%'
      : hoveredElement === section
        ? '60%'
        : '0%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #c0392b, transparent)',
    transform: 'translateX(-50%)',
    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    borderRadius: '2px',
    boxShadow: '0 0 10px rgba(192, 57, 43, 0.5)'
  });

  const navSections = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Career' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link
          to="/"
          style={logoStyle}
          className="logo"
          onClick={(e) => handleNavClick('', e)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Hover effect only on image container */}
            <div
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => setHoveredElement('logo')}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <img
                src="/logo.png"
                alt="Blacksmith Mechatronics Logo"
                style={logoImageStyle}
              />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              lineHeight: '1.2',
              marginLeft: '0.6rem'
            }}>
              <div style={{
                color: '#333333',
                fontSize: scrollY > 50 ? '1rem' : '1.1rem',
                transition: 'all 0.4s ease',
                fontWeight: '700'
              }}>
                BlackSmith
              </div>
              <div style={{
                color: '#c0392b',
                fontSize: scrollY > 50 ? '1rem' : '1.1rem',
                transition: 'all 0.4s ease',
                fontWeight: '700',
              }}>
                MechaTronics
              </div>
              <div style={{
                color: '#333333',
                fontSize: scrollY > 50 ? '0.7rem' : '0.8rem',
                transition: 'all 0.4s ease',
                fontWeight: '500',
                marginTop: '0.2rem'
              }}>
                Future of Advance Technological Products
              </div>
            </div>
          </div>
        </Link>

        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navSections.map((section) => (
            <li key={section.id}>
              <Link
                to={`/${section.id === 'home' ? '' : section.id}`}
                style={getNavLinkStyle(section.id)}
                className="nav-link"
                onMouseEnter={() => setHoveredElement(section.id)}
                onMouseLeave={() => setHoveredElement(null)}
                onClick={(e) => handleNavClick(section.id === 'home' ? '' : section.id, e)}
              >
                {section.label}
                <div style={navLinkUnderlineStyle(section.id)}></div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;