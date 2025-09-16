import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import BackgroundAnimation from './BackgroundAnimation';
import h1 from '../assets/hero/h1.png';
import h2 from '../assets/hero/h3.png';
import h3 from '../assets/hero/h4 (1).jpg';
const HeroSection = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: h1,
      alt: "Charity Volunteers Helping"
    },
    {
      image: h2, 
      alt: "Happy Children"
    },
    {
      image: h3,
      alt: "Charity Foundation Logo"
    },
    
   
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-section position-relative overflow-hidden" id="home">
      <BackgroundAnimation />
      <div className="hero-bg">
        {slides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className={`w-100 h-100 object-cover position-absolute top-0 start-0 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ zIndex: index === currentSlide ? 1 : 0 }}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>
      
      {/* Slider Navigation Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{ zIndex: 10 }}>
        <div className="d-flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Slider Navigation Arrows */}
      <button
        className="position-absolute top-50 start-0 translate-middle-y hero-nav-arrow ms-2 ms-md-3"
        style={{ zIndex: 10 }}
        onClick={goToPrevSlide}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button
        className="position-absolute top-50 end-0 translate-middle-y hero-nav-arrow me-2 me-md-3"
        style={{ zIndex: 10 }}
        onClick={goToNextSlide}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      <div className="container position-relative">
        {children}
        <div className="row align-items-center" style={{minHeight: "60vh"}}>
          <style>{`
            @media (max-width: 768px) {
              .hero-section .row.align-items-center {
                min-height: 45vh !important;
              }
            }
            @media (max-width: 576px) {
              .hero-section .row.align-items-center {
                min-height: 40vh !important;
              }
            }
          `}</style>
          <div className="col-lg-10 text-center text-lg-start mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="display-3 fw-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empowering Communities<br />
                 <span className="text-primary">Through Compassion</span>
              </motion.h1>
              
              <motion.p
                className="lead text-white-50 mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Shehryar Khan Foundation (SKF) is dedicated to providing comprehensive support 
                to underprivileged communities through trauma relief, disaster support, 
                domestic violence recovery, Islamic education, and compassion-based development.
              </motion.p>
              
              <motion.div
                className="d-flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  className="btn btn-primary btn-lg px-4 py-3"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(74,144,226,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/get-involved'}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-heart me-2"></i>
                  Join Volunteer
                </motion.button>
                
                <motion.button
                  className="btn btn-primary btn-lg px-4 py-3"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(74,144,226,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/get-involved'}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-users me-2"></i>
                  Get Involved
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;