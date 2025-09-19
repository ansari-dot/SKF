import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  padding: 4rem 0;
  background: transparent;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(127, 176, 105, 0.1), rgba(74, 144, 226, 0.1));
    z-index: 1;
    pointer-events: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(127, 176, 105, 0.15), rgba(74, 144, 226, 0.15));
    z-index: 1;
  }
  
  .container {
    position: relative;
    z-index: 2;
  }
  
  .stat-circle {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(127, 176, 105, 0.2) !important;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 255, 255, 0.4) !important;
    }
  }
  
  .stat-item h6 {
    color: #4a5568;
    letter-spacing: 1px;
    font-size: 0.9rem;
    margin-top: 1rem;
    font-weight: 600;
  }
  
  .display-6 {
    color: #2d3748 !important;
    font-weight: 700;
  }
`;

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const stats = [
    { number: 5000, suffix: 'k+', label: 'VOLUNTEERS', color: 'primary' },
    { number: 340, suffix: '+', label: 'PROJECTS', color: 'primary' },
    { number: 125, suffix: '', label: 'PROJECTS', color: 'primary' },
    { number: 75, suffix: '+', label: 'COUNTRIES', color: 'primary' }
  ];

  const AnimatedCounter = ({ number, suffix, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const end = number;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isVisible, number]);

    return (
      <span>
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <Section ref={ref}>
      <div className="container">
        <motion.div
          className="row text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <motion.div
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-circle-container position-relative d-inline-block mb-3">
                  <motion.div
                    className={`stat-circle border-5 border-${stat.color} rounded-circle d-flex align-items-center justify-content-center mx-auto`}
                    style={{ 
                      width: '140px', 
                      height: '140px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(127, 176, 105, 0.3)'
                    }}
                    initial={{ rotate: 0 }}
                    animate={isInView ? { rotate: 360 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <div className="text-center">
                      <div className="display-4 fw-bold" style={{ 
                    color: '#2d3748'
                  }}>
                        <AnimatedCounter 
                          number={stat.number} 
                          suffix={stat.suffix}
                          isVisible={isInView}
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="stat-bg-circle position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                    style={{ 
                      background: `conic-gradient(var(--bs-${stat.color}) 0deg, var(--bs-${stat.color}) 270deg, transparent 270deg)`,
                      opacity: 0.1
                    }}
                    initial={{ rotate: 0 }}
                    animate={isInView ? { rotate: 270 } : {}}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </div>
                
                <motion.h6
                  className="fw-bold text-uppercase tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {stat.label}
                </motion.h6>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default StatsSection;