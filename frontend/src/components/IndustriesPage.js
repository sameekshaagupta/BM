import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const IndustriesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const industries = [
    {
      id: 'water',
      title: 'Water Treatment Industry',
      description: 'Advanced solutions for water treatment, purification, and distribution systems. Our technologies ensure clean, safe, and sustainable water management.',
      image: 'water.png',
      features: ['Water Treatment Plants', 'Desalination Systems', 'Smart Water Networks', 'Quality Monitoring'],
      color: '#3498db'
    },
    {
      id: 'wastewater',
      title: 'Sewage & Waste Water Management',
      description: 'Innovative wastewater treatment and recycling solutions that meet environmental standards while optimizing operational efficiency.',
      image: 'hero9.jpeg',
      features: ['Biological Treatment', 'Sludge Processing', 'Effluent Recycling', 'Odor Control'],
      color: '#2ecc71'
    },
    {
      id: 'pharma',
      title: 'Pharmaceuticals',
      description: 'Precision engineering for pharmaceutical manufacturing, ensuring compliance with strict regulatory requirements and quality standards.',
      image: 'https://www.manufacturingtodayindia.com/cloud/2025/01/15/pharma-manufacturing.jpg',
      features: ['Clean Room Solutions', 'Process Automation', 'Validation Systems', 'Packaging Technology'],
      color: '#e74c3c'
    },
    {
      id: 'textile',
      title: 'Textile Industry',
      description: 'State-of-the-art machinery and automation solutions for modern textile manufacturing, from fiber to finished product.',
      image: 'textile.png',
      features: ['Automated Weaving', 'Dyeing Systems', 'Quality Inspection', 'Sustainable Processing'],
      color: '#9b59b6'
    },
    {
      id: 'automation',
      title: 'Prototype Model Development',
      description: 'Cutting-edge automation solutions for rapid prototyping and product development across multiple industries.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58Z5bPrYrT5CLsCdr9l2_EaZATd_O_an6Bw&s',
      features: ['Robotic Assembly', 'CNC Machining', '3D Printing', 'Testing Systems'],
      color: '#f39c12'
    },
    {
      id: 'agriculture',
      title: 'Agriculture Technology',
      description: 'Smart farming solutions that increase yield while optimizing resource usage through precision agriculture technologies.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxAO85P3nVUtJewyNIvlGkI8X7S6UYFXItKQ&s',
      features: ['Irrigation Systems', 'Crop Monitoring', 'Harvest Automation', 'Post-Harvest Processing'],
      color: '#1abc9c'
    },
    {
      id: 'aerospace',
      title: 'Aerospace',
      description: 'High-precision components and systems for the aerospace industry, meeting the most stringent quality and performance requirements.',
      image: 'aero.png',
      features: ['Aircraft Components', 'Avionics Systems', 'Testing Equipment', 'Composite Materials'],
      color: '#34495e'
    }
  ];

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
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    cursor:'none',
    paddingTop: isMobile ? '50px' : '0'
  };

  const customCursorStyle = {
    position: 'fixed',
    width: hoveredCard !== null ? '30px' : '15px',
    height: hoveredCard !== null ? '30px' : '15px',
    background: 'radial-gradient(circle, #c0392b 0%, #e74c3c 100%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${mousePosition.x - (hoveredCard !== null ? 15 : 7.5)}px, ${mousePosition.y - (hoveredCard !== null ? 15 : 7.5)}px)`,
    transition: 'width 0.2s, height 0.2s',
    boxShadow: '0 0 20px rgba(192, 57, 43, 0.6)',
    display: isMobile ? 'none' : 'block'
  };

  const headerStyle = {
    textAlign: 'center',
    padding: isMobile ? '2rem 1rem' : '4rem 2rem',
    position: 'relative',
    zIndex: 2
  };

  const titleStyle = {
    fontSize: isMobile ? '2.5rem' : '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #2c3e50, #34495e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    color: '#c0392b',
    marginBottom: '0.1rem',
    fontStyle: 'italic',
    animation: 'fadeInUp 1s ease-out 0.5s both'
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    cursor: isMobile ? 'default' : 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0, 0, 0, 0.05)'
  };

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  };

  const contentStyle = {
    padding: '1.5rem'
  };

  const cardTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  };

  const cardDescStyle = {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1.2rem',
    color: '#7f8c8d'
  };

  const featuresStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const featureStyle = {
    fontSize: '0.8rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    background: '#f5f7fa',
    color: '#2c3e50',
    border: '1px solid #e4e8eb'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1
  };

  const styles = `
    @keyframes glow {
      0% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
      100% { text-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)',
          transform: 'translate(50%, -50%)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)',
          transform: 'translate(-50%, 50%)'
        }}></div>

        <header style={headerStyle}>
          <motion.h1 
            style={titleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Industries
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Specialized solutions tailored to meet the unique challenges of each industry we serve
          </motion.p>
        </header>

        <motion.div 
          ref={ref}
          style={gridStyle}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              style={{
                ...cardStyle,
                transform: hoveredCard === index ? 'translateY(-8px) scale(1.02)' : 'none',
                boxShadow: hoveredCard === index ? `0 15px 30px ${industry.color}20` : '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
              variants={itemVariants}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            >
              <div style={{ position: 'relative' }}>
                <motion.img 
                  src={industry.image} 
                  alt={industry.title}
                  style={imageStyle}
                  animate={{
                    scale: hoveredCard === index ? 1.03 : 1
                  }}
                />
                <div style={overlayStyle}></div>
                <motion.div 
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    zIndex: 2,
                    color: 'white',
                    fontSize: '1.6rem',
                    fontWeight: '700',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}
                  animate={{
                    x: hoveredCard === index ? 8 : 0
                  }}
                >
                  {industry.title}
                </motion.div>
              </div>
              
              <div style={contentStyle}>
                <p style={cardDescStyle}>{industry.description}</p>
                
                <div style={featuresStyle}>
                  {industry.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      style={{
                        ...featureStyle,
                        backgroundColor: hoveredCard === index ? `${industry.color}15` : '#f5f7fa',
                        border: `1px solid ${hoveredCard === index ? industry.color : '#e4e8eb'}`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${industry.color}20`
                      }}
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  style={{
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${industry.color}, ${industry.color}80)`,
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default IndustriesPage;