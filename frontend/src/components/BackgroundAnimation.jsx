import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = ({ className = "" }) => {
  return (
    <div className={`position-absolute top-0 end-0 w-50 h-100 ${className}`}>
      <motion.div
        className="geometric-shapes h-100 position-relative"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              backgroundColor: i < 4 ? 'var(--brand-primary)' : 'var(--brand-accent)', // Half green, half blue
              right: `${i * 30}px`,
              top: `${i * 60}px`,
              opacity: 0.1 + (i * 0.1)
            }}
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BackgroundAnimation;
