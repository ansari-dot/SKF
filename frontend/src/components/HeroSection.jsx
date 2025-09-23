import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import BackgroundAnimation from './BackgroundAnimation';
import h1 from '../assets/hero/h1.png';
import h2 from '../assets/hero/h3.png';
import h3 from '../assets/hero/h1.png';
const HeroSection = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: h1,
      alt: "Charity Volunteers Helping",
      verse: {
        arabic: "وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا۟ عَلَى ٱلْإِثْمِ وَٱلْعُدْوَٰنِ",
        english: "And cooperate in righteousness and piety, but do not cooperate in sin and aggression.",
        reference: "Quran 5:2 (Surah Al-Ma'idah)"
      }
    },
    {
      image: h2, 
      alt: "Happy Children",
      verse: {
        arabic: "إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
        english: "We feed you only for the countenance of Allah. We wish not from you reward or gratitude.",
        reference: "Quran 76:9 (Surah Al-Insan)"
      }
    },
    {
      image: h3,
      alt: "Charity Foundation Logo",
      verse: {
        arabic: "مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنۢبُلَةٍۢ مِّا۟ئَةُ حَبَّةٍۢ",
        english: "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is a hundred grains.",
        reference: "Quran 2:261 (Surah Al-Baqarah)"
      }
    }
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
    <section className="hero-section position-relative overflow-hidden d-flex flex-column" id="home" style={{
      minHeight: '90vh !important',
      padding: '2rem 0 4rem',
      position: 'relative',
      '@media (max-width: 768px)': {
        minHeight: '85vh',
        padding: '1.5rem 0 3.5rem'
      },
      '@media (max-width: 576px)': {
        minHeight: '70vh !important',
        padding: '1rem 0 3rem'
      }
    }}>
      <BackgroundAnimation />
      {/* Background Images */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        {slides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className={`w-100 h-100 object-cover position-absolute top-0 start-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ 
              objectPosition: 'center 30%',
              zIndex: 0
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: [
          'linear-gradient(to bottom,',
          'rgba(0,0,0,0.3) 0%,',
          'rgba(0,0,0,0.6) 50%,',
          'rgba(0,0,0,0.9) 100%'
        ].join(' '),
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8
      }} />
      
      <div className="container position-relative d-flex flex-column h-100" style={{ paddingTop: '8rem' }}>
        {children}
        <div className="row justify-content-center" style={{ marginTop: '4rem' }}>
          <div className="col-12 text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
             
              
              <motion.div 
                className="quran-verse-container mb-4 p-2 p-md-3 rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(5px)',
                  borderRight: '4px solid #28a745',
                  maxWidth: '95%',
                  margin: '0 auto 1.5rem',
                  textAlign: 'center',
                  padding: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
                key={currentSlide}
              >
                <p className="text-white mb-2 mb-md-3" style={{ 
                  fontFamily: '"Amiri", serif', 
                  fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
                  lineHeight: '1.8',
                  direction: 'rtl',
                  marginBottom: '0.75rem',
                  padding: '0 0.5rem'
                }}>
                  {slides[currentSlide].verse.arabic}
                </p>
                <p className="text-white-50 mb-2" style={{ 
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  lineHeight: '1.5',
                  padding: '0 0.5rem'
                }}>
                  "{slides[currentSlide].verse.english}"
                </p>
                <p className="text-white-50 mt-2 mt-md-3 mb-0" style={{ 
                  fontSize: '0.8rem',
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '0.5px',
                  opacity: 0.9
                }}>
                  - {slides[currentSlide].verse.reference}
                </p>
              </motion.div>
              
            
      {/* Buttons at Bottom */}
      <div className="mt-auto pt-4 pb-5">
        <motion.div 
          className="d-flex flex-wrap gap-4 justify-content-center w-100 px-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="btn btn-primary px-4 px-md-5 py-3 position-relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px rgba(40, 167, 69, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/get-involved'}
            style={{
              cursor: 'pointer',
              minWidth: '200px',
              fontSize: '1.05rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(45deg, #28a745, #34ce57)',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              transition: 'all 0.4s ease'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              <i className="fas fa-hands-helping me-2"></i>
              Join Volunteer
            </span>
            <motion.span 
              className="position-absolute"
              style={{
                position: 'absolute',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                transform: 'scale(0)',
                zIndex: 0
              }}
              animate={{
                transform: 'scale(2.5)',
                opacity: 0
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut'
              }}
            />
          </motion.button>
          
          <motion.button
            className="btn btn-outline-light px-4 px-md-5 py-3 position-relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/get-involved'}
            style={{
              cursor: 'pointer',
              minWidth: '200px',
              border: '2px solid white',
              fontSize: '1.05rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              color: 'white',
              position: 'relative',
              zIndex: 1,
              transition: 'all 0.4s ease'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              <i className="fas fa-hand-holding-people me-2"></i>
              Get Involved
            </span>
            <motion.span 
              className="position-absolute"
              style={{
                position: 'absolute',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'scale(0)',
                zIndex: 0
              }}
              animate={{
                transform: 'scale(2.5)',
                opacity: 0
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut'
              }}
            />
          </motion.button>
        </motion.div>
      </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;