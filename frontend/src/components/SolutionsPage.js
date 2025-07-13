  import React, { useState, useEffect } from 'react';
  import { motion, useAnimation } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';

  const SolutionsPage = () => {
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

    const solutions = [
      {
        id: 'mechanical',
        title: 'Mechanical Solution',
        description: 'Innovative mechanical engineering solutions from concept to production. Our expertise covers precision components, machinery design, and mechanical systems integration.',
        icon: '⚙️',
        features: ['CAD Design', 'Prototyping', 'Structural Analysis', 'Manufacturing'],
        color: '#3498db'
      },
      {
        id: 'electrical',
        title: 'Electrical System',
        description: 'Comprehensive electrical engineering solutions including power distribution, control systems, and circuit design for industrial applications.',
        icon: '⚡',
        features: ['Circuit Design', 'PLC Programming', 'Power Systems', 'Automation'],
        color: '#f1c40f'
      },
      {
        id: 'instrumentation',
        title: 'Instrumentation',
        description: 'Precision measurement and control solutions with advanced sensors, gauges, and monitoring systems for critical processes.',
        icon: '📊',
        features: ['Sensor Integration', 'Process Control', 'Calibration', 'Data Acquisition'],
        color: '#e74c3c'
      },
      {
        id: 'automation-software',
        title: 'Automation Software Solutions',
        description: 'Tailored automation software designed to streamline industrial workflows, enhance system integration, and boost operational efficiency. From control logic to real-time monitoring, our solutions adapt to your unique production needs.',
        icon: '🤖',
        features: ['PLC & HMI Integration', 'Real-Time Monitoring', 'Process Control Logic', 'System Interfacing'],
        color: '#34495e'
      },
      {
        id: 'design-to-product',
        title: 'Design to Product',
        description: 'Comprehensive end-to-end solutions transforming concepts into market-ready products. We integrate design, engineering, prototyping, and production to accelerate time-to-market with precision and innovation.',
        icon: '🧩',
        features: ['Product Design', 'CAD & Simulation', 'Prototyping', 'Manufacturing Integration'],
        color: '#873e23'
      },
      {
        id: 'ai-ml',
        title: 'AI & Machine Learning Solution',
        description: 'Intelligent systems powered by AI and machine learning to optimize industrial operations, predict maintenance needs, and enhance decision-making through data-driven insights.',
        icon: '🧠',
        features: ['Predictive Maintenance', 'Computer Vision', 'Process Optimization', 'Intelligent Automation'],
        color: '#1abc9c'
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
      fontFamily: '"Segoe UI", Roboto, sans-serif',
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
      gap: '2rem',
      padding: isMobile ? '1rem' : '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    };

    const cardStyle = {
      background: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
      position: 'relative',
      cursor: isMobile ? 'default' : 'none',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    };

    const iconStyle = {
      fontSize: '4rem',
      textAlign: 'center',
      margin: '1.5rem 0',
      transition: 'transform 0.3s ease'
    };

    const contentStyle = {
      padding: '1.5rem',
      textAlign: 'center'
    };

    const cardTitleStyle = {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: '#2c3e50'
    };

    const cardDescStyle = {
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      color: '#555'
    };

    const featuresStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    };

    const featureStyle = {
      fontSize: '0.8rem',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      background: 'rgba(41, 182, 246, 0.1)',
      color: '#2c3e50',
      border: '1px solid rgba(41, 182, 246, 0.3)'
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
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(41, 182, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(155, 89, 182, 0.05) 0%, transparent 50%)
            `,
            opacity: 0.8
          }}></div>

          <header style={headerStyle}>
            <motion.h1 
              style={titleStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Solutions
            </motion.h1>
            <motion.p 
              style={subtitleStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive engineering solutions from design to final product implementation
            </motion.p>
          </header>

          <motion.div 
            ref={ref}
            style={gridStyle}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                style={{
                  ...cardStyle,
                  transform: hoveredCard === index ? 'translateY(-10px) scale(1.02)' : 'none',
                  boxShadow: hoveredCard === index ? `0 15px 35px ${solution.color}40` : '0 8px 32px rgba(31, 38, 135, 0.15)',
                  border: hoveredCard === index ? `1px solid ${solution.color}` : '1px solid rgba(255, 255, 255, 0.3)'
                }}
                variants={itemVariants}
                onMouseEnter={() => !isMobile && setHoveredCard(index)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
              >
                <div style={contentStyle}>
                  <motion.div 
                    style={{
                      ...iconStyle,
                      color: solution.color,
                      transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {solution.icon}
                  </motion.div>
                  
                  <h3 style={cardTitleStyle}>{solution.title}</h3>
                  <p style={cardDescStyle}>{solution.description}</p>
                  
                  <div style={featuresStyle}>
                    {solution.features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        style={{
                          ...featureStyle,
                          backgroundColor: hoveredCard === index ? `${solution.color}20` : 'rgba(41, 182, 246, 0.1)',
                          border: `1px solid ${hoveredCard === index ? solution.color : 'rgba(41, 182, 246, 0.3)'}`
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${solution.color}30`
                        }}
                      >
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${solution.color}, ${solution.color}80)`,
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

  export default SolutionsPage;