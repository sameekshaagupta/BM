import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductsPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mountRefs = useRef([]);
  const animationRefs = useRef([]);
  const sceneRefs = useRef([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const products = [
    {
      id: 'printer',
      title: '3D Printing Solutions',
      subtitle: 'Industrial Grade Additive Manufacturing',
      description: 'Revolutionary 3D printing technology for rapid prototyping, custom manufacturing, and complex geometries. Our industrial-grade printers deliver precision, speed, and reliability for aerospace, automotive, and medical applications.',
      features: ['High Precision Manufacturing', 'Multi-Material Support', 'Large Build Volume', 'Industrial Reliability'],
      image: 'https://cdn.mos.cms.futurecdn.net/VbarDAHfjcw9hudHhtprwD.jpg',
      color: '#3498db'
    },
    {
      id: 'textile-mechanical',
      title: 'Textile Mechanical Parts',
      subtitle: 'Precision Components for Textile Machinery',
      description: 'Durable and high-performance mechanical parts engineered for textile manufacturing equipment. From rollers and spindles to gears and drive systems, our components ensure optimal machine efficiency, reliability, and longevity in high-demand production environments.',
      features: ['High-Precision Rollers', 'Durable Gears & Drives', 'Custom Machined Parts', 'Maintenance & Retrofit Solutions'],
      image: 'textile.png',
      color: '#2980b9'
    },
    {
      id: 'dyeing-machinery',
      title: 'Textile Dyeing Machinery',
      subtitle: 'High-Efficiency Dyeing Solutions',
      description: 'Advanced textile dyeing machines designed for consistent color application, minimal waste, and process optimization. Our solutions support a wide range of fabrics and dye types, ensuring vibrant, uniform results with every batch.',
      features: ['Continuous & Batch Dyeing', 'Eco-Friendly Operation', 'Precise Temperature Control', 'Automated Dye Dispensing'],
      image: 'https://textilernd.com/wp-content/uploads/2021/05/Continuous-dyeing-machine.png',
      color: '#8e44ad'
    },
    {
      id: 'robots',
      title: 'Industrial Robotics',
      subtitle: 'Intelligent Automation Solutions',
      description: 'Advanced robotic systems designed for manufacturing, assembly, and material handling. Our robots integrate seamlessly with existing production lines, offering flexibility, precision, and reliability.',
      features: ['6-Axis Articulation', 'AI-Powered Control', 'Collaborative Safety', 'Real-time Analytics'],
      image: 'hero4.jpeg',
      color: '#9b59b6'
    },
    {
      id: 'instruments',
      title: 'Lab Instruments',
      subtitle: 'Scientific Analysis Equipment',
      description: 'Precision laboratory instruments for research, quality control, and analysis. Our equipment delivers accurate, reliable results for materials testing, chemical analysis, and product development.',
      features: ['High Accuracy Sensors', 'Digital Interface', 'Data Logging', 'Calibration Services'],
      specs: ['Accuracy: ±0.1%', 'Temperature Range: -20°C to 300°C', 'Data Interface: USB/Ethernet', 'Compliance: ISO Standards'],
      image: 'https://labkafe.com/storage/screw-gauge-lab-equipment-labkafe.jpg',
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Update camera aspect ratios on resize
      sceneRefs.current.forEach((sceneObj, index) => {
        if (sceneObj && mountRefs.current[index]) {
          const width = mountRefs.current[index].clientWidth;
          const height = mountRefs.current[index].clientHeight;
          sceneObj.camera.aspect = width / height;
          sceneObj.camera.updateProjectionMatrix();
          sceneObj.renderer.setSize(width, height);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      // Clean up animations
      animationRefs.current.forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const pageStyle = {
    background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 25%, #ADD8E6 50%, #87CEFA 75%, #E0F7FA 100%)',
    minHeight: '100vh',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: isMobile ? '50px' : '0'
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

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: isMobile ? '2rem' : '3rem',
    padding: isMobile ? '1rem' : '2rem 4rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const productCardStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    position: 'relative',
    cursor: isMobile ? 'default' : 'none',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const productImageStyle = {
    width: '100%',
    height: isMobile ? '200px' : '250px',
    objectFit: 'cover',
    borderRadius: '15px 15px 0 0',
    marginBottom: '1.5rem',
    transition: 'transform 0.5s ease'
  };

  const threeDContainerStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '150px',
    height: '100px',
    borderRadius: '10px',
    overflow: 'hidden',
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex: 2
  };

  const contentStyle = {
    padding: '0 1.5rem 1.5rem'
  };

  const productTitleStyle = {
    fontSize: isMobile ? '1.5rem' : '1.8rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  };

  const productSubtitleStyle = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    color: '#c0392b',
    fontWeight: '500',
    marginBottom: '1rem'
  };

  const productDescStyle = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    color: '#555'
  };

  const featuresStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  };

  const featureItemStyle = {
    fontSize: '0.9rem',
    color: '#333',
    padding: '0.5rem',
    background: 'rgba(41, 182, 246, 0.1)',
    borderRadius: '8px',
    borderLeft: '3px solid #29B6F6'
  };

  const specsStyle = {
    background: 'rgba(0, 0, 0, 0.05)',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '1rem'
  };

  const specItemStyle = {
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '0.3rem'
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
            Our Products
          </motion.h1>
          <motion.p 
            style={subtitleStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced Engineering Solutions for Modern Industry
          </motion.p>
        </header>

        <motion.div 
          ref={ref}
          style={productGridStyle}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              style={{
                ...productCardStyle,
                transform: hoveredElement === `product-${index}` ? 'translateY(-10px) scale(1.02)' : 'none',
                boxShadow: hoveredElement === `product-${index}` ? `0 20px 40px ${product.color}40` : '0 8px 32px rgba(31, 38, 135, 0.15)',
                border: hoveredElement === `product-${index}` ? `1px solid ${product.color}` : '1px solid rgba(255, 255, 255, 0.3)'
              }}
              variants={itemVariants}
              onMouseEnter={() => !isMobile && setHoveredElement(`product-${index}`)}
              onMouseLeave={() => !isMobile && setHoveredElement(null)}
            >
              <motion.img 
                src={product.image} 
                alt={product.title}
                style={productImageStyle}
                animate={{
                  scale: hoveredElement === `product-${index}` ? 1.05 : 1
                }}
              />
              
              <div style={contentStyle}>
                <h3 style={productTitleStyle}>{product.title}</h3>
                <p style={productSubtitleStyle}>{product.subtitle}</p>
                <p style={productDescStyle}>{product.description}</p>
                
                <div style={featuresStyle}>
                  {product.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      style={{
                        ...featureItemStyle,
                        backgroundColor: hoveredElement === `product-${index}` ? `${product.color}20` : 'rgba(41, 182, 246, 0.1)',
                        borderLeft: `3px solid ${hoveredElement === `product-${index}` ? product.color : '#29B6F6'}`
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: `${product.color}30`
                      }}
                    >
                      ✓ {feature}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${product.color}, ${product.color}80)`,
                  transformOrigin: 'left'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredElement === `product-${index}` ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ProductsPage;