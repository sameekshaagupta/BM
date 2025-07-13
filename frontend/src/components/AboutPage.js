import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutPage = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const pageStyle = {
    background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 25%, #ADD8E6 50%, #87CEFA 75%, #E0F7FA 100%)',
    minHeight: '100vh',
    color: '#333',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'none',
    paddingTop: isMobile ? '70px' : '30px'
  };

  const customCursorStyle = {
    position: 'fixed',
    width: hoveredElement ? '30px' : '15px',
    height: hoveredElement ? '30px' : '15px',
    background: 'radial-gradient(circle, #c0392b 0%, #e74c3c 100%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${mousePosition.x - (hoveredElement ? 15 : 7.5)}px, ${mousePosition.y - (hoveredElement ? 15 : 7.5)}px)`,
    transition: 'width 0.2s, height 0.2s',
    boxShadow: '0 0 20px rgba(192, 57, 43, 0.6)',
    display: isMobile ? 'none' : 'block'
  };

  const headerStyle = {
    textAlign: 'center',
    padding: isMobile ? '1rem' : '2rem',
    position: 'relative',
    zIndex: 2
  };

  const titleStyle = {
    fontSize: isMobile ? '2.5rem' : '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #333, #555)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
    // Removed the glow animation
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    color: '#c0392b',
    marginBottom: '0.1rem',
    fontStyle: 'italic'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '1rem' : '2rem',
    position: 'relative',
    zIndex: 2
  };

  const sectionStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem',
    border: '1px solid rgba(0, 0, 0, 0.03)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#2d3436',
    position: 'relative',
    display: 'inline-block'
  };

  const sectionTitleUnderlineStyle = {
    position: 'absolute',
    bottom: '-5px',
    left: 0,
    width: '50px',
    height: '3px',
    background: '#e74c3c',
    borderRadius: '3px'
  };

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#2d3436',
    marginBottom: '1.5rem'
  };

  const teamGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  };

  const teamCardStyle = {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const teamImageStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1rem',
    border: '3px solid #e74c3c',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
  };

  const teamNameStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2d3436'
  };

  const teamRoleStyle = {
    fontSize: '0.9rem',
    color: '#e74c3c',
    marginBottom: '1rem',
    fontWeight: '500'
  };

  const teamBioStyle = {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#636e72'
  };

  const valuesGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  };

  const valueCardStyle = {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  const valueIconStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#e74c3c'
  };

  const valueTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2d3436'
  };

  const valueDescStyle = {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#636e72'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
    gap: '1rem',
    marginTop: '2rem'
  };

  const statCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#e74c3c',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#636e72',
    fontWeight: '500'
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .team-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(231, 76, 60, 0.1);
    }

    .value-card:hover {
      transform: translateY(-5px);
      boxShadow: 0 10px 20px rgba(231, 76, 60, 0.1);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(52, 152, 219, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 90% 80%, rgba(231, 76, 60, 0.03) 0%, transparent 30%)
          `,
          opacity: 1
        }}></div>

        <header style={headerStyle}>
          <motion.h1 
            style={titleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Blacksmith Mechatronics
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pioneering the future of industrial automation and additive manufacturing
          </motion.p>
        </header>

        <motion.div 
          ref={ref}
          style={contentStyle}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Our Story Section */}
          <motion.div 
            style={sectionStyle}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('story')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <h2 style={sectionTitleStyle}>
              Our Story
              <span style={sectionTitleUnderlineStyle}></span>
            </h2>
            <p style={textStyle}>
              Founded in 2015, Blacksmith Mechatronics began as a small workshop in Ahmedabad with a vision to revolutionize industrial manufacturing through innovative mechatronic solutions. What started as a passion project between two engineers has grown into a leading provider of advanced automation and 3D printing technologies.
            </p>
            <p style={textStyle}>
              Today, we serve clients across multiple industries, from aerospace to healthcare, delivering cutting-edge solutions that push the boundaries of what's possible in manufacturing. Our journey has been marked by continuous innovation, with over 50 successful projects completed and numerous industry awards recognizing our technical excellence.
            </p>
          </motion.div>

          {/* Our Mission Section */}
          <motion.div 
            style={sectionStyle}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('mission')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <h2 style={sectionTitleStyle}>
              Our Mission
              <span style={sectionTitleUnderlineStyle}></span>
            </h2>
            <p style={textStyle}>
              At Blacksmith Mechatronics, we're driven by a singular mission: to bridge the gap between traditional manufacturing and the Industry 4.0 revolution. We believe in creating intelligent, efficient, and sustainable solutions that empower businesses to thrive in an increasingly competitive landscape.
            </p>
            <p style={textStyle}>
              Our approach combines deep engineering expertise with a relentless focus on quality and innovation. Whether it's through our precision 3D printing services, custom automation solutions, or industrial robotics, we're committed to delivering exceptional value to every client.
            </p>
          </motion.div>

          {/* Our Team Section */}
          <motion.div 
            style={sectionStyle}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('team')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <h2 style={sectionTitleStyle}>
              Our Team
              <span style={sectionTitleUnderlineStyle}></span>
            </h2>
            <p style={textStyle}>
              The heart of Blacksmith Mechatronics is our talented team of engineers, designers, and innovators. We've assembled a diverse group of professionals who share a common passion for pushing technological boundaries and solving complex industrial challenges.
            </p>
            
            <div style={teamGridStyle}>
              <motion.div 
                style={teamCardStyle}
                className="team-card"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="jagdish.jpg" 
                  alt=" Jagdish Panchal" 
                  style={teamImageStyle}
                />
                <h3 style={teamNameStyle}>Jagdish Panchal</h3>
                <p style={teamRoleStyle}>Co-Founder & CTO</p>
                <p style={teamBioStyle}>
                  Mechanical engineer with 12+ years of experience in industrial automation and additive manufacturing. Leads our technical innovation initiatives.
                </p>
              </motion.div>
              
              <motion.div 
                style={teamCardStyle}
                className="team-card"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src="pratik.jpeg" 
                  alt="Prashant Panchal" 
                  style={teamImageStyle}
                />
                <h3 style={teamNameStyle}>Prashant Panchal</h3>
                <p style={teamRoleStyle}>Co-Founder & CEO</p>
                <p style={teamBioStyle}>
                  Mechatronics specialist with expertise in robotics and control systems. Oversees business strategy and client relations.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Our Values Section */}
          <motion.div 
            style={sectionStyle}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('values')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <h2 style={sectionTitleStyle}>
              Our Values
              <span style={sectionTitleUnderlineStyle}></span>
            </h2>
            <p style={textStyle}>
              These core principles guide everything we do at Blacksmith Mechatronics, from product development to client relationships:
            </p>
            
            <div style={valuesGridStyle}>
              <motion.div 
                style={valueCardStyle}
                className="value-card"
                whileHover={{ scale: 1.02 }}
              >
                <div style={valueIconStyle}>⚙️</div>
                <h3 style={valueTitleStyle}>Innovation</h3>
                <p style={valueDescStyle}>
                  We constantly push boundaries to develop cutting-edge solutions that redefine industrial manufacturing.
                </p>
              </motion.div>
              
              <motion.div 
                style={valueCardStyle}
                className="value-card"
                whileHover={{ scale: 1.02 }}
              >
                <div style={valueIconStyle}>🎯</div>
                <h3 style={valueTitleStyle}>Precision</h3>
                <p style={valueDescStyle}>
                  Every solution we deliver meets the highest standards of accuracy and reliability.
                </p>
              </motion.div>
              
              <motion.div 
                style={valueCardStyle}
                className="value-card"
                whileHover={{ scale: 1.02 }}
              >
                <div style={valueIconStyle}>🤝</div>
                <h3 style={valueTitleStyle}>Collaboration</h3>
                <p style={valueDescStyle}>
                  We work closely with clients to understand their unique challenges and deliver tailored solutions.
                </p>
              </motion.div>
              
              <motion.div 
                style={valueCardStyle}
                className="value-card"
                whileHover={{ scale: 1.02 }}
              >
                <div style={valueIconStyle}>🌱</div>
                <h3 style={valueTitleStyle}>Sustainability</h3>
                <p style={valueDescStyle}>
                  Our solutions are designed to minimize environmental impact while maximizing efficiency.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* By The Numbers Section */}
          <motion.div 
            style={sectionStyle}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('numbers')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <h2 style={sectionTitleStyle}>
              By The Numbers
              <span style={sectionTitleUnderlineStyle}></span>
            </h2>
            
            <div style={statsGridStyle}>
              <div style={statCardStyle}>
                <div style={statNumberStyle}>50+</div>
                <div style={statLabelStyle}>Successful Projects</div>
              </div>
              
              <div style={statCardStyle}>
                <div style={statNumberStyle}>15+</div>
                <div style={statLabelStyle}>Year Experience</div>
              </div>
              
              <div style={statCardStyle}>
                <div style={statNumberStyle}>25+</div>
                <div style={statLabelStyle}>Team Members</div>
              </div>
              
              <div style={statCardStyle}>
                <div style={statNumberStyle}>24/7</div>
                <div style={statLabelStyle}>Support Available</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;