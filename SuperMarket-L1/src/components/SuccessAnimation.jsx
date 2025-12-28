import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessAnimation = ({ show, onComplete }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation file from the public folder
    fetch('/Character dance for Lingidy.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load animation:", err));
  }, []);

  useEffect(() => {
    if (show) {
      // Play for 3 seconds then close
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && animationData && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)', // Dimmed background
            zIndex: 10000, // Very high z-index
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none' // Allow clicks through if needed, but usually we block for focus
          }}
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ 
              width: 300, 
              height: 300,
              background: 'transparent'
            }}
          >
            <Lottie animationData={animationData} loop={true} />
            <h2 style={{
              textAlign: 'center',
              color: 'white',
              marginTop: '10px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontSize: '28px',
              fontWeight: '800'
            }}>
              ખૂબ સરસ! 🎉
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;
