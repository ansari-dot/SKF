import { useEffect, useState } from 'react';

// Custom hook for scroll animations
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      // Clear scrolling state after scroll ends
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return { scrollY, isScrolling };
};

// Function to add scroll animations to elements
export const addScrollAnimations = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Optional: remove class when element leaves viewport
            // entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale'
    );
    
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
};

// Enhanced scroll to top function with animation
export const scrollToTop = (options = {}) => {
  const {
    behavior = 'smooth',
    duration = 800,
    callback = null
  } = options;

  const start = window.pageYOffset;
  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOut(progress);
    
    window.scrollTo(0, start * (1 - easedProgress));
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else if (callback) {
      callback();
    }
  };

  if (behavior === 'smooth') {
    requestAnimationFrame(animateScroll);
  } else {
    window.scrollTo(0, 0);
    if (callback) callback();
  }
};

export default {
  useScrollAnimation,
  addScrollAnimations,
  scrollToTop
};