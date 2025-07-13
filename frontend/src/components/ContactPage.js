import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactPage = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: ''
    });

    try {
      const response = await fetch('https://blacksmithbackend-hsej.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: data.message || 'Your message has been sent successfully!'
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false, message: '' }));
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: error.message || 'Failed to send your message. Please try again.'
      });
    }
  };

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
  paddingTop: isMobile ? '60px' : '30px'
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
    WebkitTextFillColor: 'transparent',
    animation: '2s ease-in-out infinite alternate'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    color: '#c0392b',
    marginBottom: '0.1rem',
    fontStyle: 'italic'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1200px',
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

  const cardTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#2d3436'
  };

  const formGroupStyle = {
    marginBottom: '1rem',
    position: 'relative'
  };

  const formLabelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#636e72',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  };

  const formInputStyle = {
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
    color: '#2d3436',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  const formTextareaStyle = {
    ...formInputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const submitButtonStyle = {
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    color: 'white',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
    marginTop: '0.5rem',
    opacity: formStatus.submitting ? 0.7 : 1,
    pointerEvents: formStatus.submitting ? 'none' : 'auto'
  };

  const contactItemStyle = {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem'
  };

  const contactIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: 'rgba(231, 76, 60, 0.1)',
    fontSize: '1rem',
    flexShrink: 0,
    transition: 'all 0.3s ease',
    color: '#e74c3c'
  };

  const statusMessageStyle = {
    padding: '0.8rem',
    borderRadius: '8px',
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: '500',
    display: formStatus.message ? 'block' : 'none',
    background: formStatus.success ? 'rgba(46, 204, 113, 0.2)' : 
              formStatus.error ? 'rgba(231, 76, 60, 0.2)' : 'transparent',
    color: formStatus.success ? '#27ae60' : 
           formStatus.error ? '#e74c3c' : '#333',
    border: formStatus.success ? '1px solid rgba(46, 204, 113, 0.3)' : 
           formStatus.error ? '1px solid rgba(231, 76, 60, 0.3)' : 'none'
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    @keyframes glow {
      from { text-shadow: 0 0 5px rgba(0, 0, 0, 0.3); }
      to { text-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }
    }
    
    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: rgba(231, 76, 60, 0.5);
      box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
    
    .submit-button:hover {
      box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4) !important;
      transform: translateY(-2px) !important;
    }
    
    .contact-item:hover {
      transform: translateX(5px);
    }
    
    .contact-item:hover .contact-icon {
      background: rgba(231, 76, 60, 0.2);
      transform: scale(1.1);
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
            Contact Us
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in touch with our team for inquiries and support
          </motion.p>
        </header>

        <motion.div 
          ref={ref}
          style={gridStyle}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            style={{
              ...cardStyle,
              transform: hoveredElement === 'form' ? 'translateY(-5px) scale(1.01)' : 'none',
              boxShadow: hoveredElement === 'form' ? '0 15px 30px rgba(231, 76, 60, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.05)'
            }}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('form')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>Send Us a Message</h3>
            </div>
            
            <form 
              onSubmit={handleFormSubmit}
              style={{ padding: '1.5rem' }}
            >
              <div style={formGroupStyle} className="form-group">
                <label style={formLabelStyle} className="form-label">Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={formInputStyle} 
                  className="form-input" 
                  required 
                />
              </div>
              <div style={formGroupStyle} className="form-group">
                <label style={formLabelStyle} className="form-label">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={formInputStyle} 
                  className="form-input" 
                  required 
                />
              </div>
              <div style={formGroupStyle} className="form-group">
                <label style={formLabelStyle} className="form-label">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={formInputStyle} 
                  className="form-input" 
                />
              </div>
              <div style={formGroupStyle} className="form-group">
                <label style={formLabelStyle} className="form-label">Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={formTextareaStyle} 
                  className="form-textarea" 
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                style={submitButtonStyle} 
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => !isMobile && setHoveredElement('submit')}
                onMouseLeave={() => !isMobile && setHoveredElement('form')}
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              
              <div style={statusMessageStyle}>
                {formStatus.message}
              </div>
            </form>
            
            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #e74c3c, #c0392b)',
                transformOrigin: 'left'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredElement === 'form' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          <motion.div
            style={{
              ...cardStyle,
              transform: hoveredElement === 'info' ? 'translateY(-5px) scale(1.01)' : 'none',
              boxShadow: hoveredElement === 'info' ? '0 15px 30px rgba(231, 76, 60, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.05)'
            }}
            variants={itemVariants}
            onMouseEnter={() => !isMobile && setHoveredElement('info')}
            onMouseLeave={() => !isMobile && setHoveredElement(null)}
          >
            <div style={cardHeaderStyle}>
              <h3 style={cardTitleStyle}>Contact Information</h3>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div 
                style={contactItemStyle} 
                className="contact-item"
                onMouseEnter={() => !isMobile && setHoveredElement('contact-1')}
                onMouseLeave={() => !isMobile && setHoveredElement('info')}
              >
                <span style={contactIconStyle} className="contact-icon">👤</span>
                <div>
                  <strong>Jagdish Panchal</strong><br />
                  <span>+91-9925227359</span>
                </div>
              </div>
              <div 
                style={contactItemStyle} 
                className="contact-item"
                onMouseEnter={() => !isMobile && setHoveredElement('contact-2')}
                onMouseLeave={() => !isMobile && setHoveredElement('info')}
              >
                <span style={contactIconStyle} className="contact-icon">👤</span>
                <div>
                  <strong>Prashant Panchal</strong><br />
                  <span>+91-81602 66327</span>
                </div>
              </div>
              <div 
                style={contactItemStyle} 
                className="contact-item"
                onMouseEnter={() => !isMobile && setHoveredElement('contact-3')}
                onMouseLeave={() => !isMobile && setHoveredElement('info')}
              >
                <span style={contactIconStyle} className="contact-icon">✉️</span>
                <div>
                  <strong>Email:</strong><br />
                  <span>blacksmithmechatronics@gmail.com</span>
                </div>
              </div>
              <div 
                style={{...contactItemStyle, borderBottom: 'none', marginBottom: '0', paddingBottom: '0'}} 
                className="contact-item"
                onMouseEnter={() => !isMobile && setHoveredElement('contact-4')}
                onMouseLeave={() => !isMobile && setHoveredElement('info')}
              >
                <span style={contactIconStyle} className="contact-icon">🏢</span>
                <div>
                  <strong>Address:</strong><br />
                  <span>
                    71, Sadguru Bunglows, New Maninagar,<br />
                    Nr. Doon School, Ramol,<br />
                    Ahmedabad-382449, Gujarat, India
                  </span>
                </div>
              </div>
            </div>
            
            <motion.div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'linear-gradient(90deg, #e74c3c, #c0392b)',
                transformOrigin: 'left'
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredElement === 'info' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;