import React from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
}

const CustomCursor: React.FC<CustomCursorProps> = ({ mousePosition }) => (
  <motion.div
    className="cursor"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 999,
    }}
    animate={{
      x: mousePosition.x,
      y: mousePosition.y,
    }}
    transition={{ type: 'spring', stiffness: 120, damping: 30 }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#000',
        opacity: '.5',
        transform: 'translate(-50%, -50%)',
      }}
      className="glow"
    />
  </motion.div>
);

export default CustomCursor;
