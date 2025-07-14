import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to handle navigation with proper scroll timing
  const handleLinkClick = (path, event) => {
    event.preventDefault(); // Prevent default Link behavior
    
    // Determine the target path
    const targetPath = path === 'home' ? '/' : `/${path}`;
    
    // If navigating to the same page, just scroll to top
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
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const footerStyle = {
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(18, 23, 32, 0.97))',
    color: 'white',
    padding: '6rem 2rem 2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderTop: '1px solid rgba(255, 107, 107, 0.1)'
  };

  const footerContentStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
    gap: '3rem',
    marginBottom: '4rem',
    position: 'relative',
    zIndex: 2
  };

  const getFooterSectionStyle = (sectionName) => ({
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hoveredSection === sectionName ? 'translateY(-5px)' : 'translateY(0px)',
    willChange: 'transform'
  });

  const footerTitleStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '700',
    position: 'relative',
    display: 'inline-block'
  };

  const getFooterTitleUnderlineStyle = (sectionName) => ({
    position: 'absolute',
    bottom: '-8px',
    left: '0',
    width: hoveredSection === sectionName ? '70px' : '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #ff6b6b, #ee5a24)',
    borderRadius: '3px',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  const footerCopyrightStyle = {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '2rem',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    display: 'inline-block',
    paddingBottom: '2px',
    willChange: 'transform, color'
  };

  const linkHoverStyle = {
    color: '#ffffff',
    transform: 'translateX(5px)'
  };

  const linkUnderlineStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '0%',
    height: '1px',
    background: 'linear-gradient(90deg, #ff6b6b, #ee5a24)',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: `
      radial-gradient(2px 2px at 20% 30%, rgba(255, 107, 107, 0.1), transparent),
      radial-gradient(2px 2px at 80% 70%, rgba(255, 107, 107, 0.1), transparent),
      radial-gradient(1px 1px at 40% 80%, rgba(255, 255, 255, 0.05), transparent),
      radial-gradient(2px 2px at 60% 20%, rgba(255, 107, 107, 0.1), transparent)
    `,
    backgroundRepeat: 'repeat',
    backgroundSize: '200px 200px',
    opacity: '0.3',
    zIndex: '1'
  };

  const contactItemStyle = {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem'
  };

  const contactIconStyle = {
    color: '#ff6b6b',
    fontSize: '1.1rem',
    marginTop: '2px'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const socialLinkStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#ff6b6b',
      transform: 'translateY(-3px)'
    }
  };

  // Navigation links data
  const navigationLinks = [
    { label: 'Home', path: 'home' },
    { label: 'Products', path: 'products' },
    { label: 'Industries', path: 'industries' },
    { label: 'Solutions', path: 'solutions' },
    { label: 'Services', path: 'services' },
    { label: 'Careers', path: 'careers' },
    { label: 'About', path: 'about' },
    { label: 'Contact', path: 'contact' }
  ];

  return (
    <footer style={footerStyle}>
      <div style={backgroundPatternStyle}></div>
      
      <div style={footerContentStyle}>
        <div 
          style={getFooterSectionStyle('about')} 
          onMouseEnter={() => setHoveredSection('about')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <h3 style={footerTitleStyle}>
            Blacksmith Mechatronics
            <span style={getFooterTitleUnderlineStyle('about')}></span>
          </h3>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.9)'}}>
            Future of Technological Products
          </p>
          <p style={{opacity: 0.7, lineHeight: '1.6'}}>
            Engineering excellence in mechanical, electrical, and advanced manufacturing solutions.
          </p>
        </div>

        <div 
          style={getFooterSectionStyle('links')}
          onMouseEnter={() => setHoveredSection('links')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <h3 style={footerTitleStyle}>
            Quick Links
            <span style={getFooterTitleUnderlineStyle('links')}></span>
          </h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            {navigationLinks.map((link, index) => (
              <li key={index} style={{marginBottom: '0.8rem'}}>
                <Link 
                  to={link.path === 'home' ? '/' : `/${link.path}`}
                  onClick={(e) => handleLinkClick(link.path, e)}
                  style={{
                    ...linkStyle,
                    ...(hoveredLink === link.label && linkHoverStyle)
                  }}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span style={{
                    ...linkUnderlineStyle,
                    width: hoveredLink === link.label ? '100%' : '0%'
                  }}></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div 
          style={getFooterSectionStyle('services')}
          onMouseEnter={() => setHoveredSection('services')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <h3 style={footerTitleStyle}>
            Our Services
            <span style={getFooterTitleUnderlineStyle('services')}></span>
          </h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            {[
              'Mechatronic System Design',
              'Industrial Automation',
              'Robotics Solutions',
              'Custom Machinery',
              'Prototyping',
              'Product Development'
            ].map((service, index) => (
              <li key={index} style={{marginBottom: '0.8rem'}}>
                <span style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div 
          style={getFooterSectionStyle('contact')}
          onMouseEnter={() => setHoveredSection('contact')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <h3 style={footerTitleStyle}>
            Contact Us
            <span style={getFooterTitleUnderlineStyle('contact')}></span>
          </h3>
          
          <div style={contactItemStyle}>
            <span style={contactIconStyle }>📞</span>
            <span style={{color: 'rgba(255, 255, 255, 0.8)', paddingTop:'4px'}}>+91-99134 90604</span>
          </div>
          
          <div style={contactItemStyle}>
            <span style={contactIconStyle}>✉️</span>
            <span style={{color: 'rgba(255, 255, 255, 0.8)', paddingTop:'4px'}}>blacksmithmechatronics@gmail.com</span>
          </div>
          
          <div style={contactItemStyle}>
            <span style={contactIconStyle}>📍</span>
            <span style={{color: 'rgba(255, 255, 255, 0.8)', paddingTop:'4px'}}>Ahmedabad, Gujarat, India</span>
          </div>

          <div style={socialLinksStyle}>
            {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
              <a 
                key={social}
                href={`https://www.${social}.com`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={socialLinkStyle}
              >
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={footerCopyrightStyle}>
        &copy; {new Date().getFullYear()} Blacksmith Mechatronics. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;