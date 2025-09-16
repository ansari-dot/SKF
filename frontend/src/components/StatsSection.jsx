import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
    <section className="py-5" ref={ref}>
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
                    style={{ width: '120px', height: '120px' }}
                    initial={{ rotate: 0 }}
                    animate={isInView ? { rotate: 360 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <div className="text-center">
                      <div className={`display-6 fw-bold text-${stat.color}`}>
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
                  className="fw-bold text-uppercase tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  {stat.label}
                </motion.h6>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;