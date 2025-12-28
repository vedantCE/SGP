import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Basket.css';

const Basket = ({ collectedItems, onDrop, lastDroppedAnimation }) => {
  const [particles, setParticles] = useState([]);
  const [wobble, setWobble] = useState(false);

  useEffect(() => {
    if (collectedItems.length > 0) {
      // Trigger wobble
      setWobble(true);
      setTimeout(() => setWobble(false), 500);

      // Create sparkle particles
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i * 45) * Math.PI / 180,
        color: getRandomColor()
      }));
      setParticles(newParticles);

      // Remove particles after animation
      setTimeout(() => setParticles([]), 800);
    }
  }, [collectedItems.length]);

  const getRandomColor = () => {
    const colors = ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Generate stable, strictly bound positions for basket items
  const getItemStyle = (item, index) => {
    // Rigid Grid Logic to prevent overflow
    // 3 columns: Left (-35px), Center (0px), Right (+35px)
    const col = index % 3;
    const row = Math.floor(index / 3);
    
    // X Offset: -35, 0, +35
    const offsetX = (col - 1) * 35; 
    
    // Y Offset: Stack upwards, 15px per row + small random noise
    // Using simple deterministic noise based on index to avoid robotics
    const noiseY = (index % 2 === 0 ? 5 : 0); 
    const offsetY = -(row * 15) - noiseY;

    // Rotation: gentle random
    const rotate = ((index * 13) % 30) - 15; // -15 to +15 deg

    return {
      rotate: rotate,
      x: offsetX,
      y: offsetY,
      zIndex: index + 5
    };
  };

  return (
    <div className="basket-zone">
      <motion.div
        className={`basket ${wobble ? 'wobble' : ''}`}
        animate={wobble ? {
          rotate: [0, -3, 3, -2, 2, 0],
          y: [0, -5, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Basket body */}
        <div className="basket-container">
          <div className="basket-rim"></div>
          <div className="basket-body">
            {/* Visual Items Inside Basket */}
            <div className="basket-items-visual">
              <AnimatePresence>
                {collectedItems.map((item, index) => {
                  const style = getItemStyle(item, index);
                  return (
                    <motion.div
                      key={`${item.id}-${index}`}
                      className="basket-item-visual"
                      initial={{ scale: 0, y: -50, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        y: style.y, 
                        x: style.x,
                        rotate: style.rotate,
                        opacity: 1 
                      }}
                      style={{ zIndex: style.zIndex }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 20
                      }}
                    >
                      {item.emoji}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          
            {/* Weave pattern overlay (transparent) */}
            <div className="basket-weave"></div>
          
          </div>
          <div className="basket-handle"></div>
        </div>

        {/* Sparkle particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="sparkle-particle"
              style={{
                background: particle.color
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1
              }}
              animate={{
                x: Math.cos(particle.angle) * 60,
                y: Math.sin(particle.angle) * 60,
                scale: 0,
                opacity: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Basket;
