import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CareerPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    relocate: '',
    experience: '',
    coverLetter: '',
    resume: null,
    consent: false
  });

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const mountRefs = useRef([]);
  const animationRefs = useRef([]);
  const sceneRefs = useRef([]);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      }
      // Clean up animations
      animationRefs.current.forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.consent) {
      setSubmitStatus({
        type: 'error',
        message: 'You must consent to the processing of your personal data'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataObj = new FormData();
      
      formDataObj.append('firstName', formData.firstName);
      formDataObj.append('lastName', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone || '');
      formDataObj.append('position', formData.position);
      formDataObj.append('relocate', formData.relocate);
      formDataObj.append('experience', formData.experience);
      formDataObj.append('coverLetter', formData.coverLetter);
      formDataObj.append('consent', formData.consent.toString());
      
      if (formData.resume) {
        formDataObj.append('resume', formData.resume);
      }

      const response = await fetch('https://blacksmithbackend-hsej.onrender.com/api/careers/submit', {
        method: 'POST',
        body: formDataObj
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We\'ll be in touch soon.'
        });
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          relocate: '',
          experience: '',
          coverLetter: '',
          resume: null,
          consent: false
        });
        
        const fileInput = document.getElementById('resume');
        if (fileInput) fileInput.value = '';
        
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit application. Please try again.'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Style objects
  const pageStyle = {
    background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 25%, #ADD8E6 50%, #87CEFA 75%, #E0F7FA 100%)',
    minHeight: '100vh',
    color: '#333',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'none',
    paddingTop: isMobile ? '60px' : '0',
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
    padding: isMobile ? '2rem 1rem 1rem 1rem' : '4rem 2rem 2rem 2rem',
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
    lineHeight: isMobile ? '1.2' : '1.3',
    animation: 'glow 2s ease-in-out infinite alternate'
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    color: '#c0392b',
    marginBottom: '0.1rem',
    fontStyle: 'italic',
    lineHeight: isMobile ? '1.4' : '1.5',
    animation: 'fadeInUp 1s ease-out 0.5s both'
  };

  const formContainerStyle = {
    maxWidth: '800px',
    margin: isMobile ? '0 1rem 2rem 1rem' : '0 auto 3rem auto',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2.5rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    overflow: 'hidden'
  };

  const formGroupStyle = {
    marginBottom: isMobile ? '1.2rem' : '1.5rem',
    position: 'relative'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#2d3436',
    fontSize: isMobile ? '0.9rem' : '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '0.8rem' : '0.75rem',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    fontSize: isMobile ? '16px' : '1rem',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.7rem top 50%',
    backgroundSize: '0.65rem auto',
    paddingRight: '2.5rem'
  };

  const radioGroupStyle = {
    display: 'flex',
    gap: isMobile ? '1rem' : '1.5rem',
    marginTop: '0.5rem',
    flexWrap: 'wrap'
  };

  const radioLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
    minHeight: '44px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: isMobile ? '100px' : '120px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const fileInputStyle = {
    display: 'none'
  };

  const fileLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '1.2rem 1rem' : '1rem',
    border: '2px dashed rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(41, 182, 246, 0.1)',
    fontSize: isMobile ? '0.9rem' : '1rem',
    minHeight: '44px'
  };

  const fileNameStyle = {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#555',
    wordBreak: 'break-all'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: isSubmitting ? '#95a5a6' : '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    marginTop: '1rem',
    position: 'relative',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const checkboxStyle = {
    marginRight: '0.5rem',
    minWidth: '16px',
    minHeight: '16px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#2d3436',
    lineHeight: '1.5',
    gap: '0.5rem'
  };

  const statusMessageStyle = {
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1.5rem',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: isMobile ? '0.9rem' : '1rem',
    backgroundColor: submitStatus?.type === 'success' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
    color: submitStatus?.type === 'success' ? '#155724' : '#721c24',
    border: submitStatus?.type === 'success' ? '1px solid rgba(40, 167, 69, 0.3)' : '1px solid rgba(220, 53, 69, 0.3)'
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .form-input:hover, .form-input:focus {
          border-color: #e74c3c !important;
          box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
          outline: none !important;
        }

        .file-label:hover {
          border-color: #e74c3c !important;
          background-color: rgba(231, 76, 60, 0.1) !important;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #c0392b !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        @media (max-width: 767px) {
          .form-input, .form-input:focus {
            font-size: 16px !important;
          }
          
          .submit-btn:hover {
            transform: none !important;
          }
        }

        @media (max-width: 480px) {
          .radio-group {
            flex-direction: column;
            gap: 0.8rem;
          }
        }
      `}</style>
      
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
            radial-gradient(circle at 20% 80%, rgba(192, 57, 43, 0.1) 0%, transparent 50%),
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
            Join Our Team
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Help shape the future of 3D printing technology
          </motion.p>
        </header>

        <motion.div 
          ref={ref}
          style={formContainerStyle}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          onMouseEnter={() => !isMobile && setHoveredElement('form')}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
        >
          <motion.form 
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={inputStyle}
                placeholder="Enter your first name"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={inputStyle}
                placeholder="Enter your last name"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={inputStyle}
                placeholder="Enter your email address"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="form-input"
                style={inputStyle}
                placeholder="Enter your phone number (optional)"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={inputStyle}
                placeholder="Enter the position you're applying for"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle}>Are you willing to relocate? *</label>
              <div style={radioGroupStyle} className="radio-group">
                <label style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="relocate"
                    value="yes"
                    checked={formData.relocate === 'yes'}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="relocate"
                    value="no"
                    checked={formData.relocate === 'no'}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="experience">Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={selectStyle}
              >
                <option value="">Select your experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                style={textareaStyle}
                placeholder="Tell us why you're a good fit for this position"
              />
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={labelStyle} htmlFor="resume">Resume *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleChange}
                required
                disabled={isSubmitting}
                accept=".pdf,.doc,.docx"
                style={fileInputStyle}
              />
              <label 
                htmlFor="resume" 
                className="file-label" 
                style={{
                  ...fileLabelStyle,
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={() => !isMobile && !isSubmitting && setHoveredElement('file')}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                {formData.resume ? formData.resume.name : 'Upload your resume (PDF or Word)'}
              </label>
              {formData.resume && <div style={fileNameStyle}>Selected file: {formData.resume.name}</div>}
            </motion.div>

            <motion.div style={formGroupStyle} variants={itemVariants}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  style={checkboxStyle}
                />
                <span>I consent to the processing of my personal data *</span>
              </label>
            </motion.div>

            <motion.button
              type="submit"
              className="submit-btn"
              style={buttonStyle}
              disabled={isSubmitting}
              variants={itemVariants}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              onMouseEnter={() => !isMobile && !isSubmitting && setHoveredElement('button')}
              onMouseLeave={() => !isMobile && setHoveredElement(null)}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </motion.button>

            {submitStatus && (
              <motion.div 
                style={statusMessageStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </>
  );
};

export default CareerPage;