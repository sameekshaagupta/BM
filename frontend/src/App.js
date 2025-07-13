import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import ProductsPage from './components/ProductsPage';
import { services, testimonials, teamMembers, stats } from './data/data';
import './styles/styles.css';
import IndustriesPage from './components/IndustriesPage';
import SolutionsPage from './components/SolutionsPage';
import AdvancedServicesPage from './components/AdvancedServicesPage'
import CareerPage from './components/CareerPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
const HomePage = ({ 
  stats, 
  heroRef 
}) => (
  <>
    <Hero heroRef={heroRef} stats={stats} />
  </>
);

const BlacksmithMechatronics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <div className="main-container">
        <Header 
          scrollY={scrollY}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                testimonials={testimonials}
                teamMembers={teamMembers}
                stats={stats}
                heroRef={heroRef}
              />
            } 
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/industries" element={<IndustriesPage/>}/>
          <Route path="/solutions" element={<SolutionsPage/>}/>
          // In your routes
          <Route path="/services" element={<AdvancedServicesPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default BlacksmithMechatronics;