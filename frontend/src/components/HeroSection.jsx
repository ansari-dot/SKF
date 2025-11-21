import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import BackgroundAnimation from './BackgroundAnimation';
import h1 from '../assets/hero/h1.webp';
import h2 from '../assets/hero/h3.webp';
import h3 from '../assets/hero/h1.webp';
import { preloadImages } from '../utils/imageUtils';

const HeroSection = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Preload images for better performance
  useEffect(() => {
    const imageSources = slides.map(slide => slide.image);

    preloadImages(imageSources)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to preload images:', error);
        setImagesLoaded(true); // Continue even if preloading fails
      });
  }, []);

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
        minHeight: '100vh',
        height: '100vh',
        padding: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background Images */}
        <div className="hero-background-container" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          zIndex: 0
        }}>
          {slides.map((slide, index) => (
            <motion.img
              key={index}
              src={slide.image}
              alt={slide.alt}
              className="w-100 h-100 position-absolute top-0 start-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1 }}
              style={{
                objectFit: 'cover',
                objectPosition: 'center 30%',
                zIndex: 0,
                width: '100%',
                height: '100%'
              }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

      <div className="container position-relative d-flex flex-column justify-content-center h-100" style={{
        paddingTop: '9.5rem',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
      }}>
        {children}
        <div className="row justify-content-center flex-grow-1 d-flex align-items-center" style={{ marginTop: '7rem', paddingBottom: '9rem' }}>
          <div className="col-12 text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >


              <motion.div
                className="quran-verse-container mb-4 p-4 p-md-5 rounded-4"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.65))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '2px solid rgba(127, 176, 105, 0.3)',
                  borderLeft: '5px solid var(--brand-primary)',
                  borderRight: '5px solid var(--brand-accent)',
                  maxWidth: '90%',
                  margin: '0 auto 2rem',
                  textAlign: 'center',
                  padding: '2rem 2.5rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                key={currentSlide}
              >
                {/* Decorative gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 20% 50%, rgba(127, 176, 105, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(74, 144, 226, 0.15) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: 0
                }}></div>
                
                {/* Content wrapper */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="text-white mb-3 mb-md-4" style={{
                  fontFamily: '"Amiri", serif',
                  lineHeight: '2',
                  direction: 'rtl',
                  marginBottom: '1.5rem',
                  padding: '0 0.5rem',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: '500'
                }}>
                  {slides[currentSlide].verse.arabic}
                </p>
                <p className="text-white mb-3" style={{
                  fontStyle: 'italic',
                  lineHeight: '1.8',
                  padding: '0 0.5rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.4)',
                  fontWeight: '400'
                }}>
                  "{slides[currentSlide].verse.english}"
                </p>
                <p className="text-white-50 mt-3 mt-md-4 mb-0" style={{
                  fontFamily: '"Poppins", sans-serif',
                  letterSpacing: '0.8px',
                  opacity: 0.85,
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                }}>
                  - {slides[currentSlide].verse.reference}
                </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Buttons at Bottom */}
      <div className="position-absolute bottom-0 w-100 hero-buttons-container" style={{ 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 5,
        paddingBottom: '3rem'
      }}>
        <motion.div
          className="d-flex flex-wrap gap-3 justify-content-center w-100 px-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="btn btn-primary modern-cta-button"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 16px 40px rgba(127, 176, 105, 0.5)",
              y: -4
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/get-involved'}
            style={{
              cursor: 'pointer',
              minWidth: '240px',
              fontSize: '1.15rem',
              fontWeight: '700',
              letterSpacing: '0.8px',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--brand-primary) 0%, #6FA058 50%, var(--brand-primary) 100%)',
              backgroundSize: '200% 100%',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              padding: '1.1rem 3rem',
              color: 'white',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(127, 176, 105, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              textTransform: 'uppercase'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <motion.i 
                className="fas fa-hands-helping"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              ></motion.i>
              Join Volunteer
            </span>
            <motion.span
              className="position-absolute"
              style={{
                position: 'absolute',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '120px',
                height: '120px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                zIndex: 0
              }}
              animate={{
                scale: [0, 5, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            {/* Shimmer effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                zIndex: 1
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'linear'
              }}
            />
          </motion.button>

          <motion.button
            className="btn btn-outline-light modern-cta-button-secondary"
            whileHover={{
              scale: 1.1,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderColor: 'rgba(255, 255, 255, 1)',
              y: -4,
              boxShadow: '0 16px 40px rgba(255, 255, 255, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/our-work'}
            style={{
              cursor: 'pointer',
              minWidth: '240px',
              border: '3px solid rgba(255, 255, 255, 0.95)',
              fontSize: '1.15rem',
              fontWeight: '700',
              letterSpacing: '0.8px',
              borderRadius: '50px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              color: 'white',
              position: 'relative',
              zIndex: 1,
              padding: '1.1rem 3rem',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              textTransform: 'uppercase'
            }}
          >
            <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <motion.i 
                className="fas fa-hand-holding-people"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.i>
              Learn More
            </span>
            {/* Glowing border effect */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50px',
                padding: '3px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1), rgba(255,255,255,0.4))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                opacity: 0,
                zIndex: 0
              }}
              whileHover={{ opacity: 1 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;