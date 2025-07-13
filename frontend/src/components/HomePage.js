import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const testimonialInterval = useRef(null);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Patel",
      role: "CTO, AquaPure Solutions",
      content: "Blacksmith Mechatronics transformed our water treatment plant with their advanced automation solutions. Their team's expertise reduced our operational costs by 30% while improving efficiency.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Production Head, Vastra Textiles",
      content: "The textile machinery we purchased from Blacksmith has been running flawlessly for 2 years now. Their after-sales support is exceptional - quick response times and knowledgeable technicians.",
      rating: 4
    },
    {
      id: 3,
      name: "Dr. Amit Desai",
      role: "Research Director, PharmaLife Labs",
      content: "Their precision instrumentation solutions have been crucial for our lab's research. The custom software integration they provided has saved us countless hours of manual data collection.",
      rating: 5
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Auto-rotate testimonials
    testimonialInterval.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(testimonialInterval.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [testimonials.length]);

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
    color: '#333',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'none'
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

  const sectionStyle = {
    padding: isMobile ? '4rem 1rem' : '6rem 2rem',
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    background: 'linear-gradient(135deg, #333, #555)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    display: 'inline-block'
  };

  const titleUnderlineStyle = {
    position: 'absolute',
    bottom: '-5px',
    left: 0,
    width: '50px',
    height: '3px',
    background: '#e74c3c',
    borderRadius: '3px'
  };

  const textStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.8',
    color: '#2d3436',
    marginBottom: '1.5rem'
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    transition: 'all 0.3s ease'
  };

  const cardIconStyle = {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#e74c3c'
  };

  const cardTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#2d3436'
  };

  const testimonialContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '2.5rem',
    marginTop: '3rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '300px'
  };

  const testimonialContentStyle = {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
    position: 'relative',
    zIndex: 2
  };

  const testimonialAuthorStyle = {
    fontWeight: '700',
    marginBottom: '0.3rem'
  };

  const testimonialRoleStyle = {
    fontSize: '0.9rem',
    color: '#636e72'
  };

  const testimonialControlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem'
  };

  const testimonialDotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#bdc3c7',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginTop: '3rem'
  };

  const statCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#e74c3c',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '1rem',
    color: '#636e72',
    fontWeight: '500'
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
     @keyframes glow {
    0% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    100% { text-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
  }
  
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
  
  @keyframes circuitAnimation {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes gearRotation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes numberGlow {
    0% { 
      background-position: 0% 50%;
      text-shadow: 0 0 10px rgba(192, 57, 43, 0.3);
    }
    100% { 
      background-position: 100% 50%;
      text-shadow: 0 0 15px rgba(192, 57, 43, 0.5);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .service-card {
    animation: fadeInUp 0.8s ease-out;
    animation-fill-mode: both;
  }

  .testimonial-content {
    animation: fadeIn 0.8s ease-out;
  }
  `;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className="rating-star">
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <>
      <style>{styles}</style>
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
        {/* Background Elements */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(52, 152, 219, 0.03) 0%, transparent 30%),
            radial-gradient(circle at 90% 80%, rgba(231, 76, 60, 0.03) 0%, transparent 30%)
          `,
          zIndex: -1
        }}></div>

        {/* Hero Section */}
        <section style={{ 
          ...sectionStyle, 
          height: isMobile ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}>
          <motion.h1 
            style={{ 
              ...titleStyle, 
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              marginBottom: '1rem',
              animation: 'glow 2s ease-in-out infinite alternate'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Innovating <span style={{ color: '#e74c3c' }}>Industrial</span> Solutions
          </motion.h1>
          <motion.p 
            style={{ 
              ...textStyle, 
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pioneering mechatronic solutions that bridge the gap between mechanical engineering and advanced automation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              style={{
                background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => !isMobile && setHoveredElement('cta')}
              onMouseLeave={() => !isMobile && setHoveredElement(null)}
            >
              Explore Our Services
            </motion.button>
          </motion.div>
        </section>

        {/* About Section */}
        <section style={sectionStyle}>
          <motion.div 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <h2 style={titleStyle}>
                Who We Are
                <span style={titleUnderlineStyle}></span>
              </h2>
              <p style={textStyle}>
                Blacksmith Mechatronics is a leading engineering firm specializing in integrated mechanical, electrical, and software solutions for industrial applications. Founded in 2015, we've grown from a small workshop to a trusted partner for Fortune 500 companies and innovative startups alike.
              </p>
              <p style={textStyle}>
                Our team of 50+ engineers combines decades of experience with cutting-edge technology to deliver solutions that push the boundaries of what's possible in manufacturing, automation, and industrial processes.
              </p>
            </motion.div>

            <div style={statsGridStyle}>
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '200+', label: 'Clients Worldwide' },
                { number: '500+', label: 'Projects Completed' },
                { number: '98%', label: 'Client Satisfaction' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  style={statCardStyle}
                  variants={itemVariants}
                  onMouseEnter={() => !isMobile && setHoveredElement(`stat-${index}`)}
                  onMouseLeave={() => !isMobile && setHoveredElement(null)}
                >
                  <div style={statNumberStyle}>{stat.number}</div>
                  <div style={statLabelStyle}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section style={sectionStyle}>
          <motion.div 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <h2 style={titleStyle}>
                Our Core Services
                <span style={titleUnderlineStyle}></span>
              </h2>
              <p style={textStyle}>
                We offer comprehensive engineering solutions tailored to your specific industrial needs. Our multidisciplinary approach ensures seamless integration across all aspects of your project.
              </p>
            </motion.div>

            <div style={cardGridStyle}>
              {[
                { 
                  icon: '⚙️', 
                  title: 'Mechanical Engineering', 
                  content: 'Precision design and manufacturing of mechanical components and systems for industrial applications.' 
                },
                { 
                  icon: '🔌', 
                  title: 'Electrical Systems', 
                  content: 'Custom electrical solutions including power distribution, control panels, and automation wiring.' 
                },
                { 
                  icon: '💻', 
                  title: 'Industrial Software', 
                  content: 'Custom SCADA, MES, and IoT solutions to optimize your manufacturing processes.' 
                },
                { 
                  icon: '🤖', 
                  title: 'Automation', 
                  content: 'Robotic and automated systems to increase productivity and reduce human error.' 
                },
                { 
                  icon: '📊', 
                  title: 'Instrumentation', 
                  content: 'Precision measurement and control systems for critical industrial processes.' 
                },
                { 
                  icon: '🛠️', 
                  title: 'Maintenance', 
                  content: 'Preventive and predictive maintenance programs to maximize equipment lifespan.' 
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  style={cardStyle}
                  className="card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => !isMobile && setHoveredElement(`service-${index}`)}
                  onMouseLeave={() => !isMobile && setHoveredElement(null)}
                >
                  <div style={cardIconStyle}>{service.icon}</div>
                  <h3 style={cardTitleStyle}>{service.title}</h3>
                  <p style={textStyle}>{service.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
{/* Testimonials Section */}
<section style={sectionStyle}>
  <motion.div 
    ref={ref}
    variants={containerVariants}
    initial="hidden"
    animate={controls}
  >
    <motion.div variants={itemVariants}>
      <h2 style={titleStyle}>
        Client Testimonials
        <span style={titleUnderlineStyle}></span>
      </h2>
      <p style={textStyle}>
        Hear from industry leaders who have transformed their operations with our solutions.
      </p>
    </motion.div>

    <motion.div 
      style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '3rem auto 0',
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
      variants={itemVariants}
    >
      <motion.div
        key={activeTestimonial}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          fontSize: '3.5rem',
          color: 'rgba(231, 76, 60, 0.15)',
          marginBottom: '1.5rem',
          lineHeight: 1
        }}>
          "
        </div>
        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: '#2d3436',
          marginBottom: '2rem',
          fontStyle: 'italic',
          fontWeight: 500
        }}>
          {testimonials[activeTestimonial].content}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.3rem',
          marginBottom: '1.5rem'
        }}>
          {renderStars(testimonials[activeTestimonial].rating)}
        </div>
        <h4 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#2d3436',
          marginBottom: '0.3rem'
        }}>
          {testimonials[activeTestimonial].name}
        </h4>
        <p style={{
          fontSize: '0.95rem',
          color: '#636e72',
          fontWeight: '500'
        }}>
          {testimonials[activeTestimonial].role}
        </p>
      </motion.div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.8rem',
        marginTop: '2.5rem'
      }}>
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveTestimonial(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              background: activeTestimonial === index ? '#e74c3c' : '#dfe6e9',
              cursor: 'pointer',
              padding: 0,
              outline: 'none'
            }}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  </motion.div>
</section>

        {/* CTA Section */}
        <section style={{ 
          ...sectionStyle,
          textAlign: 'center',
          paddingBottom: isMobile ? '4rem' : '6rem'
        }}>
          <motion.div 
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={itemVariants}>
              <h2 style={{ 
                ...titleStyle,
                fontSize: isMobile ? '2rem' : '2.5rem',
                marginBottom: '1rem'
              }}>
                Ready to Transform Your Operations?
              </h2>
              <p style={{ 
                ...textStyle,
                maxWidth: '700px',
                margin: '0 auto 2rem'
              }}>
                Contact us today to discuss how our engineering solutions can optimize your industrial processes and drive your business forward.
              </p>
              <motion.button
                style={{
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => !isMobile && setHoveredElement('cta2')}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default HomePage;