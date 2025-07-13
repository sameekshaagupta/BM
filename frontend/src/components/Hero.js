import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      icon: '🔧',
      title: 'Industrial Automation',
      description: 'Custom automation solutions for manufacturing processes, improving efficiency and reducing costs.',
      features: ['PLC Programming', 'SCADA Systems', 'Robotic Integration', 'Process Optimization']
    },
    {
      icon: '🖨️',
      title: '3D Printing Services',
      description: 'Advanced additive manufacturing with precision prototyping and production capabilities.',
      features: ['Rapid Prototyping', 'Production Parts', 'Custom Materials', 'Post-Processing']
    },
    {
      icon: '⚙️',
      title: 'Mechatronic Design',
      description: 'Integrated mechanical, electrical, and software solutions for complex engineering challenges.',
      features: ['System Integration', 'Control Systems', 'Sensor Networks', 'IoT Implementation']
    },
    {
      icon: '🤖',
      title: 'Robotics Solutions',
      description: 'Cutting-edge robotic systems for manufacturing, assembly, and material handling.',
      features: ['Industrial Robots', 'Collaborative Robots', 'Vision Systems', 'Path Planning']
    },
    {
      icon: '🛠️',
      title: 'Instruments Calibration',
      description: 'Precise calibration services to maintain accuracy and reliability of measurement instruments.',
      features: ['Traceable Calibration', 'Multi-Parameter Support', 'On-Site Services', 'Calibration Certificates']
    },
    {
      icon: '🔬',
      title: 'R&D Services',
      description: 'Research and development support for innovative product development and optimization.',
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

  const achievements = [
    { title: 'ISO 9001:2015 Certified', description: 'Quality management systems certification' },
    { title: 'Industry Excellence Award 2023', description: 'Recognized for innovation in automation' },
    { title: 'Green Manufacturing Partner', description: 'Sustainable manufacturing practices' },
    { title: 'Technology Innovation Award', description: 'Advanced mechatronic solutions' }
  ];

  // Cursor styling
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
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    cursor: isMobile ? 'default' : 'none'
  };

  const sectionStyle = {
    padding: isMobile ? '3rem 1rem' : '5rem 2rem',
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? '2rem' : '2.5rem',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #333, #444, #555)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'glow 2s ease-in-out infinite alternate'
  };

  const sectionSubtitleStyle = {
    fontSize: isMobile ? '1rem' : '1.2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#c0392b',
    fontStyle: 'italic',
    opacity: 0.9
  };

  const styles = `
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

    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .service-card {
      animation: fadeInUp 0.8s ease-out;
      animation-fill-mode: both;
    }

    .testimonial-card {
      animation: slideIn 0.8s ease-out;
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
      transition: opacity 1s ease-in-out;
    }

    .hero-slide.active {
      opacity: 1;
    }

    .gears-decoration {
      animation: float 3s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={customCursorStyle}></div>
      <div style={pageStyle}>
        {/* Hero Section with Sliding Images */}
        <section style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: isMobile ? '60px' : '0'
          }}>
            {/* Hero Slides */}
            <div 
              className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero1.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero2.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero3.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 3 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero4.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 4 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero5.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 5 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero6.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 6 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero7.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 7 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero8.jpeg')",
                zIndex: 1
              }}
            ></div>
            <div 
              className={`hero-slide ${currentSlide === 8 ? 'active' : ''}`}
              style={{
                backgroundImage: "url('hero9.jpeg')",
                zIndex: 1
              }}
            ></div>
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 2
            }}></div>
          </section>

        {/* BlackSmith MechaTronics Block - Now positioned below hero section */}
        <section style={{
          position: 'relative',
          zIndex: 3,
          marginTop: isMobile ? '6rem' : '8rem',
          marginBottom: isMobile ? '3rem' : '5rem'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 4,
            width: isMobile ? '90%' : '60%',
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.11)',
            padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '2.2rem' : 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: '1rem',
              fontWeight: '800',
              animation: 'glow 2s ease-in-out infinite alternate',
              lineHeight: '1.2'
            }}>
              <span style={{ color: '#333' }}>BlackSmith</span>{' '}
              <span style={{ color: '#c0392b', textShadow: '0 0 10px rgba(192, 57, 43, 0.3)' }}>MechaTronics</span>
            </h1>
            
            <p style={{
              fontSize: isMobile ? '0.9rem' : '1.2rem',
              marginBottom: '1rem',
              fontStyle: 'italic',
              color: '#c0392b',
              animation: 'fadeInUp 1s ease-out 0.7s both',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              fontWeight: '600'
            }}>
              Future of Advanced Technological Products
            </p>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.3rem',
              marginBottom: '2rem',
              color: '#333',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              animation: 'fadeInUp 1s ease-out 0.5s both',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              fontWeight: '500'
            }}>
              Engineering Excellence in Mechanical, Instrumentation, Electrical & Advanced Manufacturing Solutions
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '3rem'
            }}>
              {stats.slice(0, 3).map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.53)',
                    textAlign: 'center',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 1s ease-out ${1 + index * 0.2}s both`,
                    cursor: isMobile ? 'default' : 'none',
                    transform: hoveredElement === `stat-${index}` ? 'translateY(-5px) scale(1.02)' : 'none',
                    boxShadow: hoveredElement === `stat-${index}` ? '0 10px 20px rgba(192, 57, 43, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={() => !isMobile && setHoveredElement(`stat-${index}`)}
                  onMouseLeave={() => !isMobile && setHoveredElement(null)}
                >
                  <span style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#c0392b',
                    display: 'block',
                    marginBottom: '0.5rem',
                    animation: 'numberGlow 2s ease-in-out infinite alternate',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {stat.number}
                  </span>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#333',
                    fontWeight: '500',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
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
          <p style={sectionSubtitleStyle}>Comprehensive solutions for modern industrial challenges</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: isMobile ? 'default' : 'none',
                  transform: hoveredElement === `service-${index}` ? 'translateY(-10px) scale(1.02)' : 'none',
                  boxShadow: hoveredElement === `service-${index}` ? '0 20px 40px rgba(192, 57, 43, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.1)',
                  animationDelay: `${index * 0.2}s`
                }}
                onMouseEnter={() => !isMobile && setHoveredElement(`service-${index}`)}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  animation: hoveredElement === `service-${index}` ? 'pulse 1s infinite' : 'none'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#2d3436',
                  textAlign: 'center'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#636e72',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {service.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  {service.features.map((feature, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        background: '#f8f9fa',
                        color: '#2d3436',
                        border: '1px solid #e9ecef'
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
          <h2 style={sectionTitleStyle}>What Our Clients Say</h2>
          <p style={sectionSubtitleStyle}>Trusted by industry leaders across Gujarat and beyond</p>
          
          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            minHeight: isMobile? '450px' : '300px'
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
                    transition: 'opacity 0.6s ease-in-out',
                    padding: '0 1rem',
                    pointerEvents: activeTestimonial === index ? 'auto' : 'none'
                  }}
                >
                  <div style={{
                    fontSize: '4rem',
                    color: '#c0392b',
                    marginBottom: '1rem',
                    opacity: 0.3,
                    lineHeight: 1
                  }}>
                    "
                  </div>
                  <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    color: '#2d3436',
                    marginBottom: '2rem',
                    fontStyle: 'italic'
                  }}>
                    {testimonial.text}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} style={{ color: '#f39c12', fontSize: '1.5rem' }}>★</span>
                    ))}
                  </div>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#2d3436',
                    marginBottom: '0.5rem'
                  }}>
                    {testimonial.name}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#c0392b',
                    fontWeight: '500'
                  }}>
                    {testimonial.position}, {testimonial.company}
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
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeTestimonial === index ? '#c0392b' : '#ddd',
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
          background: 'rgba(192, 57, 43, 0.1)',
          borderRadius: '20px',
          margin: '2rem auto',
          maxWidth: '1000px',
          marginBottom:'90px'
        }}>
          <h2 style={{
            ...sectionTitleStyle,
            color: '#c0392b',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your Manufacturing?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: '#2d3436',
            opacity: 0.9
          }}>
            Let's discuss how our advanced mechatronic solutions can revolutionize your industrial processes.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Link to='/contact'>
              <button
                style={{
                  background: '#c0392b',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredElement === 'cta-primary' ? 'translateY(-3px) scale(1.05)' : 'none',
                  boxShadow: hoveredElement === 'cta-primary' ? '0 10px 25px rgba(192, 57, 43, 0.3)' : 'none'
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