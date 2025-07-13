  import React, { useState, useEffect } from 'react';
  import { motion, useAnimation } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';
  import { Link } from 'react-router-dom';

  const AdvancedServicesPage = ({ services = [
   {
  id: 'jobwork',
  title: '3D Printing Job Work',
  description: 'On-demand 3D printing services for prototyping, low-volume production, and functional testing using various materials and technologies.',
  icon: '🖨️',
  features: [
    { name: 'Material Versatility', detail: 'PLA, ABS, PETG, TPU & more' },
    { name: 'Rapid Turnaround', detail: 'Fast production cycles' },
    { name: 'Custom Finishing', detail: 'Sanding, painting, and coating' }
  ],
  color: '#3498db',
},
{
  id: 'modeling',
  title: '3D Design & Development',
  description: 'Custom CAD modeling for functional parts, prototypes, and manufacturing-ready designs using DFM principles.',
  icon: '✏️',
  features: [
    { name: 'Parametric Modeling', detail: 'Editable and reusable designs' },
    { name: 'Design for 3D Printing', detail: 'Supports overhangs and tolerances' },
    { name: 'Assembly Simulation', detail: 'Fit and function validation' }
  ],
  color: '#2ecc71',
},
{
  id: 'software',
  title: '3D Printer Software & Firmware',
  description: 'Tailored software and firmware development for print optimization, machine control, and user interface improvements.',
  icon: '💻',
  features: [
    { name: 'Custom Slicers', detail: 'Advanced G-code generation' },
    { name: 'Firmware Development', detail: 'Marlin, Klipper & custom stacks' },
    { name: 'UI/UX Integration', detail: 'Touchscreen and web interfaces' }
  ],
  color: '#9b59b6',
},
{
  id: 'hardware',
  title: 'FDM 3D Printer Development',
  description: 'Design and development of FDM 3D printers from core architecture to specialized mechanical components.',
  icon: '⚙️',
  features: [
    { name: 'Modular Frame Design', detail: 'Scalable build volumes' },
    { name: 'Precision Motion Systems', detail: 'Linear rails, coreXY & more' },
    { name: 'Heated Build Chambers', detail: 'High-performance material support' }
  ],
  color: '#f39c12',
},
{
  id: 'textile',
  title: 'Textile Machine Solutions',
  description: 'Customized solutions for textile machinery design, automation, and retrofitting to improve performance and production output.',
  icon: '🧵',
  features: [
    { name: 'Automation Systems', detail: 'PLC, HMI, and sensor integration' },
    { name: 'Mechanical Upgrades', detail: 'Precision components and drives' },
    { name: 'Energy Optimization', detail: 'Reduced power consumption' }
  ],
  color: '#16a085',
},
{
  id: 'reverse',
  title: 'Reverse Engineering',
  description: 'Digitizing physical objects into accurate 3D CAD models for analysis, replication, or design improvements.',
  icon: '🔄',
  features: [
    { name: '3D Scanning', detail: 'High-resolution capture' },
    { name: 'CAD Reconstruction', detail: 'Editable parametric files' },
    { name: 'Tolerance Inspection', detail: 'Engineering-grade accuracy' }
  ],
  color: '#1abc9c',
}
  ] }) => {
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
      background: 'linear-gradient(135deg, #333, #555)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'glow 2s ease-in-out infinite alternate'
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
      gap: '1.5rem',
      padding: isMobile ? '1rem' : '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    };

    const cardStyle = {
      background: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      cursor: isMobile ? 'pointer' : 'none',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      border: '1px solid rgba(0, 0, 0, 0.03)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    };

    const cardHeaderStyle = {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      padding: '1.5rem',
      textAlign: 'center',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    };

    const iconContainerStyle = {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
      fontSize: '2.5rem',
      transition: 'all 0.3s ease'
    };

    const cardTitleStyle = {
      fontSize: '1.4rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: '#2d3436'
    };

    const cardDescStyle = {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: '#636e72',
      marginBottom: '0.5rem'
    };

    const cardHighlightStyle = {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#e74c3c',
      marginTop: '0.5rem'
    };

    const cardContentStyle = {
      padding: '1.5rem',
      flex: '1',
      display: 'flex',
      flexDirection: 'column'
    };

    const featuresTitleStyle = {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#636e72',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    };

    const featuresTitleLineStyle = {
      flex: '1',
      height: '1px',
      background: 'rgba(0, 0, 0, 0.1)'
    };

    const featuresListStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1.5rem'
    };

    const featureItemStyle = {
      display: 'flex',
      gap: '0.8rem'
    };

    const featureIconStyle = {
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      background: 'rgba(41, 182, 246, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3498db',
      fontSize: '0.9rem',
      flexShrink: '0'
    };

    const featureContentStyle = {
      flex: '1'
    };

    const featureNameStyle = {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#2d3436',
      marginBottom: '0.2rem'
    };

    const featureDetailStyle = {
      fontSize: '0.85rem',
      color: '#636e72',
      lineHeight: '1.5'
    };

    const cardFooterStyle = {
      padding: '1rem 1.5rem',
      background: 'rgba(0, 0, 0, 0.02)',
      borderTop: '1px solid rgba(0, 0, 0, 0.03)',
      textAlign: 'center'
    };

    const ctaButtonStyle = {
      background: 'linear-gradient(135deg, #3498db, #2980b9)',
      color: 'white',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      width: '100%',
      boxShadow: '0 2px 10px rgba(52, 152, 219, 0.3)'
    };

    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
      }

      @keyframes glow {
        0% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        100% { text-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
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
              Advanced 3D Printing Services
            </motion.h1>
            <motion.p 
              style={subtitleStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional additive manufacturing solutions from prototyping to full-scale production
            </motion.p>
          </header>

          <motion.div 
            ref={ref}
            style={gridStyle}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                style={{
                  ...cardStyle,
                  transform: hoveredCard === index ? 'translateY(-5px) scale(1.01)' : 'none',
                  boxShadow: hoveredCard === index ? 
                    `0 15px 30px ${service.color}20` : 
                    '0 10px 30px rgba(0, 0, 0, 0.05)'
                }}
                variants={itemVariants}
                onMouseEnter={() => !isMobile && setHoveredCard(index)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
              >
                <div style={cardHeaderStyle}>
                  <motion.div 
                    style={{
                      ...iconContainerStyle,
                      color: service.color,
                      transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                      animation: hoveredCard === index ? 'float 3s ease-in-out infinite' : 'none'
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  <h3 style={cardTitleStyle}>{service.title}</h3>
                  <p style={cardDescStyle}>{service.description}</p>
                  <p style={cardHighlightStyle}>{service.highlight}</p>
                </div>
                
                <div style={cardContentStyle}>
                  <div style={featuresTitleStyle}>
                    <span style={featuresTitleLineStyle}></span>
                    <span>Key Features</span>
                    <span style={featuresTitleLineStyle}></span>
                  </div>
                  
                  <div style={featuresListStyle}>
                    {service.features.map((feature, idx) => (
                      <div key={idx} style={featureItemStyle}>
                        <div style={featureIconStyle}>
                          {idx + 1}
                        </div>
                        <div style={featureContentStyle}>
                          <div style={featureNameStyle}>{feature.name}</div>
                          <div style={featureDetailStyle}>{feature.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={cardFooterStyle}>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <motion.button
                      style={{
                        ...ctaButtonStyle,
                        background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: `0 5px 15px ${service.color}40`
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Request Service
                    </motion.button>
                  </Link>
                </div>
                
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </>
    );
  };

  export default AdvancedServicesPage;