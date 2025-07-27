import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const heroImages = [
  '/hero1.jpeg',
  '/hero2.jpeg',
  '/hero3.jpeg',
  '/hero4.jpeg',
  '/hero5.jpeg',
  '/hero6.jpeg',
  '/hero7.jpeg',
  '/hero8.jpeg',
  '/hero9.jpeg'
];

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  
  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Blacksmith Mechatronics transformed our production line with their automation solutions. We saw a 40% increase in efficiency within the first quarter.",
      avatar: "R"
    },
    {
      name: "Priya Sharma", 
      text: "Their 3D printing services helped us accelerate our product development cycle by 60%. The quality and precision are exceptional.",
      avatar: "P"
    },
    {
      name: "Amit Patel",
      text: "The mechatronic solutions provided by Blacksmith have revolutionized our manufacturing process. Highly professional team!",
      avatar: "A"
    },
    {
      name: "Sunita Joshi",
      text: "Outstanding quality control systems implementation. Their attention to detail and technical expertise is unmatched.",
      avatar: "S"
    },
    {
      name: "Vikram Singh",
      text: "Blacksmith's robotics solutions have significantly improved our assembly line productivity while maintaining excellent quality standards.",
      avatar: "V"
    },
    {
      name: "Neha Gupta",
      text: "Their R&D services helped us bring our product to market faster than we thought possible. Truly innovative partners in engineering.",
      avatar: "N"
    }
  ];

  const companies = [
    'GSK', 'DRL', 'Cipla', 'Baxter', 'Aurobindo', 'Emcure', 'Eva Pharma', 'Geltec',
    'Expert Pharma', 'Hayat', 'Mankind', 'MAC', 'Intas', 'IWD', 'Hetero', 'Nativita',
    'NecLife', 'Ram Pharma', 'Quest', 'Pharmax', 'NeoPharma', 'Zydus', 'Strides', 'Sanofi'
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

const customCursorStyle = {
  position: 'fixed',
  width: hoveredElement !== null ? '30px' : '15px',
  height: hoveredElement !== null ? '30px' : '15px',
  background: 'radial-gradient(circle, #c0392b 0%, #e74c3c 100%)',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: 9999,
  left: `${mousePosition.x}px`,
  top: `${mousePosition.y}px`,
  transform: `translate(-50%, -50%)`, // This centers the cursor perfectly
  transition: 'width 0.2s, height 0.2s',
  boxShadow: '0 0 20px rgba(192, 57, 43, 0.6)',
  display: isMobile ? 'none' : 'block'
};
  const pageStyle = {
    minHeight: '100vh',
    color: '#333',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    cursor: isMobile ? 'default' : 'none'
  };

  return (
    <div className="homepage">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .hero-slide.active {
          opacity: 1;
        }
      `}</style>
      
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
      
        <section className="hero-section">
          {heroImages.map((image, index) => (
  <div 
    key={index}
    className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
    style={{
      backgroundImage: `url(${image})`,
      zIndex: 1
    }}
  ></div>
))}
          
          <div className="hero-overlay"></div>
          <div className="hero-circle-1"></div>
          <div className="hero-circle-2"></div>
          
          <div className="hero-container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="hero-badge">
                  <span>Industrial Automation</span>
                </div>
                
                <h1>
                  <span className="hero-gradient-text">
                    <span style={{color: 'black'}}>Blacksmith </span><span style={{color: 'red'}}>Mechatronics </span>
                  </span>
                </h1>
                
                <p className="hero-description">
                  Advanced Mechatronic Solutions for Industrial Innovation. We provide cutting-edge engineering solutions in mechanical, instrumentation, electrical, and advanced manufacturing.
                </p>
                
                <div className="hero-buttons">
                  <Link to="/services" style={{ textDecoration: 'none' }}>
                  <button 
                    className="hero-primary-button "
                    onMouseEnter={() => !isMobile && setHoveredElement('hero-primary')}
                    onMouseLeave={() => !isMobile && setHoveredElement(null)}
                  >
                    Explore Services
                  </button></Link>
                </div>
              </div>
              
              <div className="hero-image-container">
                <div className="hero-image-card">
                  <div className="hero-image-content">
                    <div className="hero-image-icon">
                      <div className="hero-image-inner-icon"></div>
                    </div>
                    <h3>Mechatronics</h3>
                    <p>Integrated Solutions</p>
                  </div>
                  <div className="hero-image-decoration">
                    <span>⚙️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="manufacturing-section">
          <div className="manufacturing-container">
            <div className="manufacturing-grid">
              <div className="manufacturing-image-container">
                <div className="manufacturing-image-wrapper">
                  <div className="manufacturing-image-overlay"></div>
                  <div className="manufacturing-image-card">
                    <div className="manufacturing-image-content">
                      <div className="manufacturing-image-icon">🏭</div>
                      <h3>Smart Manufacturing</h3>
                      <p>Next-Gen Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="manufacturing-content">
                <div className="manufacturing-badge">
                  <span>Smart Manufacturing Solutions</span>
                </div>
                
                <h2>
                  Revolutionize <span className="manufacturing-gradient-text">Manufacturing</span>
                </h2>
                
                <p className="manufacturing-description">
                  Blacksmith Mechatronics brings the future of manufacturing to your doorstep with our comprehensive Smart Manufacturing Solutions. By seamlessly integrating cutting-edge technologies, advanced automation, and data-driven intelligence, we empower businesses to achieve unprecedented levels of productivity, efficiency, and quality.
                </p>
                
                <div className="manufacturing-features">
                  <div className="manufacturing-feature-card">
                    <div className="feature-icon">
                      <span>⚡</span>
                    </div>
                    <h4>Industrial Automation</h4>
                    <p>Custom automation solutions for manufacturing</p>
                  </div>
                  <div className="manufacturing-feature-card">
                    <div className="feature-icon">
                      <span>🖨️</span>
                    </div>
                    <h4>3D Printing</h4>
                    <p>Advanced additive manufacturing services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="services-container">
            <div className="services-header">
              <h2>Our Core Services</h2>
              <p>Comprehensive Engineering Solutions</p>
            </div>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-card-overlay"></div>
                <div className="service-card-content">
                  <div className="service-icon">
                    <span>⚙️</span>
                  </div>
                  <span className="service-badge">Automation</span>
                  <h3>Industrial Automation</h3>
                  <p className="service-description">
                    Custom automation solutions for manufacturing processes, improving efficiency and reducing operational costs through advanced control systems.
                  </p>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="service-button">
                    Contact Us
                  </button>
                  </Link>
                </div>
              </div>

              <div className="service-card">
                <div className="service-card-overlay purple"></div>
                <div className="service-card-content">
                  <div className="service-icon purple">
                    <span>🖨️</span>
                  </div>
                  <span className="service-badge purple">Manufacturing</span>
                  <h3>3D Printing Services</h3>
                  <p className="service-description">
                    Advanced additive manufacturing with precision prototyping and production capabilities for complex geometries and custom parts.
                  </p>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="service-button purple">
                    Contact Us
                  </button>
                  </Link>
                </div>
              </div>

              <div className="service-card">
                <div className="service-card-overlay orange"></div>
                <div className="service-card-content">
                  <div className="service-icon orange">
                    <span>🔧</span>
                  </div>
                  <span className="service-badge orange">Engineering</span>
                  <h3>Mechatronic Design</h3>
                  <p className="service-description">
                    Integrated mechanical, electrical, and software solutions for complex engineering challenges in modern manufacturing.
                  </p>
                 <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button className="service-button orange">
                    Contact Us
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="robotics-section">
          <div className="robotics-container">
            <div className="robotics-grid">
              <div className="robotics-content">
                <div className="robotics-badge">
                  <span>Advanced Solutions</span>
                </div>
                
                <h2>
                  Robotics <span className="robotics-gradient-text">Solutions</span>
                </h2>
                
                <p className="robotics-description">
                  Transform your manufacturing processes with Blacksmith's cutting-edge robotic systems. Our solutions provide precision automation for manufacturing, assembly, and material handling, improving productivity while maintaining excellent quality standards.
                </p>
                
                <div className="robotics-features">
                  <div className="robotics-feature">
                    <div className="feature-check">
                      <span>✓</span>
                    </div>
                    <div>
                      <h4>Industrial Robots</h4>
                      <p>High-performance automation for demanding applications</p>
                    </div>
                  </div>
                  <div className="robotics-feature">
                    <div className="feature-check green">
                      <span>✓</span>
                    </div>
                    <div>
                      <h4>Collaborative Robots</h4>
                      <p>Safe human-robot interaction for flexible automation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="robotics-image-container">
                <div className="robotics-image-wrapper">
                  <div className="robotics-image-card">
                    <div className="robotics-image-content">
                      <div className="robotics-image-icon">🤖</div>
                      <h3>Robotics</h3>
                      <p>Precision Automation</p>
                    </div>
                  </div>
                  <div className="robotics-image-decoration">
                    <span>⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="provider-section">
          <div className="provider-overlay"></div>
          <div className="provider-circle-1"></div>
          <div className="provider-circle-2"></div>
          
          <div className="provider-container">
            <h2>
              Global Provider of Mechatronic Solutions.
            </h2>
            <p>
              We are a leading provider of advanced engineering solutions in industrial automation, 3D printing, robotics, and mechatronic design for manufacturing industries worldwide.
            </p>
          </div>
        </section>

        <section className="engineering-section">
          <div className="engineering-container">
            <div className="engineering-header">
              <h2>ENGINEERING SERVICES</h2>
              <p>Comprehensive Mechatronic Solutions</p>
            </div>
            
            <div className="engineering-grid">
              <div className="engineering-card">
                <div className="engineering-icon">
                  <span>⚙️</span>
                </div>
                <h3>Industrial Automation</h3>
                <p className="engineering-description">
                  Our industrial automation solutions include PLC programming, SCADA systems, robotic integration, and process optimization to enhance your manufacturing efficiency and reduce operational costs.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="engineering-button">
                  Contact Us
                </button>
                </Link>
              </div>
              
              <div className="engineering-card">
                <div className="engineering-icon green">
                  <span>🖨️</span>
                </div>
                <h3>3D Printing Services</h3>
                <p className="engineering-description">
                  Our advanced additive manufacturing services offer rapid prototyping, production parts, custom materials, and post-processing for complex geometries and custom components.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="engineering-button green">
                  Contact Us
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="additional-services-section">
          <div className="additional-services-container">
            <div className="additional-services-header">
              <h2>Additional Services</h2>
              <p>Comprehensive Engineering Solutions</p>
            </div>
            
            <div className="additional-services-grid">
              <div className="additional-service-card">
                <div className="additional-service-icon">
                  <span>🔧</span>
                </div>
                <h3>Mechatronic Design</h3>
                <p>
                  Integrated mechanical, electrical, and software solutions for complex engineering challenges in modern manufacturing.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="additional-service-link">
                  Contact Us →
                </button>
                </Link>
              </div>
              
              <div className="additional-service-card">
                <div className="additional-service-icon green">
                  <span>🤖</span>
                </div>
                <h3>Robotics Solutions</h3>
                <p>
                  Cutting-edge robotic systems for manufacturing, assembly, and material handling with precision and reliability.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="additional-service-link green">
                  Contact Us →
                </button>
                </Link>
              </div>
              
              <div className="additional-service-card">
                <div className="additional-service-icon orange">
                  <span>📏</span>
                </div>
                <h3>Instruments Calibration</h3>
                <p>
                  Precise calibration services to maintain accuracy and reliability of measurement instruments with certified standards.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="additional-service-link orange">
                  Contact Us →
                </button>
                </Link>
              </div>
              
              <div className="additional-service-card">
                <div className="additional-service-icon purple">
                  <span>🔬</span>
                </div>
                <h3>R&D Services</h3>
                <p>
                  Research and development support for innovative product development and optimization with cutting-edge methodologies.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="additional-service-link purple">
                  Contact Us →
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="testimonials-container">
            <div className="testimonials-header">
              <h2>
                Testimonials of what <span className="testimonials-gradient-text">Clients are saying.</span>
              </h2>
              
            </div>
            
            <div className="testimonials-slider-container">
  <div className="testimonials-slider">
    <button 
      className="slider-arrow prev"
      onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
    >
      &larr;
    </button>
    
    <div className="testimonials-track-wrapper">
      <div 
        className="testimonials-track" 
        style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                {testimonial.avatar}
              </div>
              <div className="testimonial-content">
                <blockquote>
                  "{testimonial.text}"
                </blockquote>
                <div className="testimonial-author">
                  <p className="name">{testimonial.name}</p>
                  <p className="position">{testimonial.position}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★★★★★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <button 
      className="slider-arrow next"
      onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
    >
      &rarr;
    </button>
  </div>
  
  <div className="testimonials-dots">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveTestimonial(index)}
        className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
      />
    ))}
  </div>
</div>
          </div>
        </section>

        <section className="clients-section">
          <div className="clients-container">
            <div className="clients-header">
              <h2>
                Trusted by <span className="clients-gradient-text">global brands.</span>
              </h2>
              <p>Join hundreds of customers around the globe.</p>
            </div>
            
            <div className="clients-slider-container">
              <div className="clients-slider-overlay left"></div>
              <div className="clients-slider-overlay right"></div>
              
              <div className="clients-slider">
                <div className="clients-track">
                  {[...companies, ...companies].map((company, index) => (
                    <div 
                      key={index} 
                      className="client-logo"
                      onMouseEnter={() => !isMobile && setHoveredElement(`client-${index}`)}
                      onMouseLeave={() => !isMobile && setHoveredElement(null)}
                    >
                      <span>{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="clients-cta">
              <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button 
                className="clients-button"
                onMouseEnter={() => !isMobile && setHoveredElement('clients-button')}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                Become Our Partner
              </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;