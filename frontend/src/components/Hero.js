import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 9);
    }, 6000);
    
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(slideInterval);
    };
  }, []);

  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '30+', label: 'Happy Clients' }
  ];

  const services = [
    {
      icon: '⚙️',
      title: 'Industrial Automation',
      description: 'Custom automation solutions for manufacturing processes, improving efficiency and reducing operational costs through advanced control systems.',
      features: ['PLC Programming', 'SCADA Systems', 'Robotic Integration', 'Process Optimization']
    },
    {
      icon: '🔧',
      title: '3D Printing Services',
      description: 'Advanced additive manufacturing with precision prototyping and production capabilities for complex geometries and custom parts.',
      features: ['Rapid Prototyping', 'Production Parts', 'Custom Materials', 'Post-Processing']
    },
    {
      icon: '🛠️',
      title: 'Mechatronic Design',
      description: 'Integrated mechanical, electrical, and software solutions for complex engineering challenges in modern manufacturing.',
      features: ['System Integration', 'Control Systems', 'Sensor Networks', 'IoT Implementation']
    },
    {
      icon: '🤖',
      title: 'Robotics Solutions',
      description: 'Cutting-edge robotic systems for manufacturing, assembly, and material handling with precision and reliability.',
      features: ['Industrial Robots', 'Collaborative Robots', 'Vision Systems', 'Path Planning']
    },
    {
      icon: '📏',
      title: 'Instruments Calibration',
      description: 'Precise calibration services to maintain accuracy and reliability of measurement instruments with certified standards.',
      features: ['Traceable Calibration', 'Multi-Parameter Support', 'On-Site Services', 'Calibration Certificates']
    },
    {
      icon: '🔬',
      title: 'R&D Services',
      description: 'Research and development support for innovative product development and optimization with cutting-edge methodologies.',
      features: ['Concept Development', 'Feasibility Studies', 'Prototype Testing', 'Technology Transfer']
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      position: 'Manufacturing Director',
      company: 'Gujarat Industries Ltd.',
      text: 'Blacksmith Mechatronics transformed our production line with their automation solutions. We saw a 40% increase in efficiency within the first quarter.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      position: 'R&D Manager',
      company: 'TechCorp Solutions',
      text: 'Their 3D printing services helped us accelerate our product development cycle by 60%. The quality and precision are exceptional.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      position: 'Operations Head',
      company: 'Industrial Dynamics',
      text: 'The mechatronic solutions provided by Blacksmith have revolutionized our manufacturing process. Highly professional team!',
      rating: 5
    },
    {
      name: 'Sunita Joshi',
      position: 'Quality Manager',
      company: 'Precision Parts Co.',
      text: 'Outstanding quality control systems implementation. Their attention to detail and technical expertise is unmatched.',
      rating: 5
    }
  ];

  // Cursor styling - unchanged as requested
  const customCursorStyle = {
    position: 'fixed',
    width: hoveredElement !== null ? '30px' : '15px',
    height: hoveredElement !== null ? '30px' : '15px',
    background: 'radial-gradient(circle, #c0392b 0%, #e74c3c 100%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${mousePosition.x - (hoveredElement !== null ? 15 : 7.5)}px, ${mousePosition.y - (hoveredElement !== null ? 15 : 7.5)}px)`,
    transition: 'width 0.2s, height 0.2s',
    boxShadow: '0 0 20px rgba(192, 57, 43, 0.6)',
    display: isMobile ? 'none' : 'block'
  };

  const pageStyle = {
    background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 25%, #ADD8E6 50%, #87CEFA 75%, #E0F7FA 100%)',
    minHeight: '100vh',
    color: '#333',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    cursor: isMobile ? 'default' : 'none'
  };

  const sectionStyle = {
    padding: isMobile ? '4rem 1rem' : '5rem 2rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? '2.2rem' : '2.8rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#2c3e50',
    letterSpacing: '-0.02em'
  };

  const sectionSubtitleStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#34495e',
    fontWeight: '400',
    maxWidth: '600px',
    margin: '0 auto 3rem'
  };

  const styles = `
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

    .professional-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .professional-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      border-color: rgba(192, 57, 43, 0.2);
    }

    .service-icon {
      transition: transform 0.2s ease;
    }

    .professional-card:hover .service-icon {
      transform: scale(1.1);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
        {/* Hero Section */}
        <section style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: isMobile ? '60px' : '0'
        }}>
          {/* Hero Slides */}
          {[1,2,3,4,5,6,7,8,9].map((num, index) => (
            <div 
              key={num}
              className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
              style={{
                backgroundImage: `url('hero${num}.jpeg')`,
                zIndex: 1
              }}
            ></div>
          ))}
          
          {/* Professional Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.85) 0%, rgba(52, 73, 94, 0.75) 50%, rgba(44, 62, 80, 0.85) 100%)',
            zIndex: 2
          }}></div>

          {/* Hero Content */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            textAlign: 'center',
            color: 'white',
            padding: '2rem',
            maxWidth: '800px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.8rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              animation: 'fadeIn 1s ease-out',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Engineering Excellence in Manufacturing
            </h1>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              marginBottom: '2rem',
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
              animation: 'fadeIn 1s ease-out 0.3s both',
              fontWeight: '400',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              Advanced Mechatronic Solutions for Industrial Innovation
            </p>
          </div>
        </section>

        {/* Company Introduction */}
        <section style={{
          position: 'relative',
          zIndex: 3,
          marginTop: isMobile ? '4rem' : '6rem',
          marginBottom: isMobile ? '3rem' : '4rem'
        }}>
          <div className="professional-card" style={{
            position: 'relative',
            zIndex: 4,
            width: isMobile ? '95%' : '80%',
            maxWidth: isMobile?'80%':'1000px',
            margin: '0 auto',
            borderRadius: '12px',
            padding: isMobile ? '2rem 1.5rem' : '3.5rem 3rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2.2rem' : '2.8rem',
              marginBottom: '1rem',
              fontWeight: '700',
              lineHeight: '1.3',
              color: '#2c3e50'
            }}>
              <span style={{ color: '#2c3e50' }}>BlackSmith</span>{' '}
              <span style={{ color: '#c0392b' }}>MechaTronics</span>
            </h1>
            
            <p style={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              marginBottom: '1rem',
              fontStyle: 'italic',
              color: '#c0392b',
              fontWeight: '500'
            }}>
              Future of Advanced Technological Products
            </p>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.15rem',
              marginBottom: '2.5rem',
              color: '#34495e',
              maxWidth: '800px',
              margin: '0 auto 2.5rem',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Engineering Excellence in Mechanical, Instrumentation, Electrical & Advanced Manufacturing Solutions
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="professional-card"
                  style={{
                    padding: '2rem 1.5rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    cursor: isMobile ? 'default' : 'none',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)'
                  }}
                  onMouseEnter={() => !isMobile && setHoveredElement(`stat-${index}`)}
                  onMouseLeave={() => !isMobile && setHoveredElement(null)}
                >
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#c0392b',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    {stat.number}
                  </span>
                  <span style={{ 
                    fontSize: '0.95rem', 
                    color: '#34495e',
                    fontWeight: '500'
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Our Services</h2>
          <p style={sectionSubtitleStyle}>
            Comprehensive engineering solutions designed to optimize your manufacturing processes and drive operational excellence.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                className="professional-card"
                style={{
                  borderRadius: '10px',
                  padding: '2.5rem',
                  cursor: isMobile ? 'default' : 'none',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  height: 'fit-content'
                }}
                onMouseEnter={() => !isMobile && setHoveredElement(`service-${index}`)}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                <div 
                  className="service-icon"
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    filter: 'grayscale(0.2)'
                  }}
                >
                  {service.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#2c3e50',
                  textAlign: 'center'
                }}>
                  {service.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#5d6d7e',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {service.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  justifyContent: 'center'
                }}>
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.85rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '15px',
                        background: '#ecf0f1',
                        color: '#2c3e50',
                        border: '1px solid #d5dbdb',
                        fontWeight: '500'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Client Testimonials</h2>
          <p style={sectionSubtitleStyle}>
            Trusted partnerships with leading industries across Gujarat and beyond.
          </p>
          
          <div className="professional-card" style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            minHeight: isMobile ? '400px' : '300px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              position: 'relative',
              height: '100%'
            }}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    opacity: activeTestimonial === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    padding: '0 1rem',
                    pointerEvents: activeTestimonial === index ? 'auto' : 'none'
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    color: '#c0392b',
                    marginBottom: '1rem',
                    opacity: 0.3,
                    lineHeight: 1,
                    fontFamily: 'Georgia, serif'
                  }}>
                    "
                  </div>
                  
                  <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.7',
                    color: '#2c3e50',
                    marginBottom: '2rem',
                    fontStyle: 'italic',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                  }}>
                    {testimonial.text}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#f39c12', fontSize: '1.2rem' }}>★</span>
                    ))}
                  </div>
                  
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '0.3rem'
                  }}>
                    {testimonial.name}
                  </h4>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#c0392b',
                    fontWeight: '500',
                    marginBottom: '0.2rem'
                  }}>
                    {testimonial.position}
                  </p>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    fontWeight: '400'
                  }}>
                    {testimonial.company}
                  </p>
                </div>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeTestimonial === index ? '#c0392b' : '#bdc3c7',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          ...sectionStyle,
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div className="professional-card" style={{
            borderRadius: '12px',
            margin: '2rem auto',
            maxWidth: '900px',
            padding: isMobile ? '2.5rem 2rem' : '3rem 2.5rem',
            background: 'rgba(44, 62, 80, 0.38)',
            color: 'white',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Ready to Optimize Your Manufacturing?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: 'rgba(26, 14, 58, 0.9)',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Let's discuss how our engineering solutions can enhance your operational efficiency and drive sustainable growth.
            </p>
            
            <Link to='/contact' style={{textDecoration: 'none'}}>
              <button
                style={{
                  background: '#c0392b',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredElement === 'cta-primary' ? 'translateY(-2px)' : 'none',
                  boxShadow: hoveredElement === 'cta-primary' ? '0 8px 20px rgba(192, 57, 43, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={() => !isMobile && setHoveredElement('cta-primary')}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                Get Started Today
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;