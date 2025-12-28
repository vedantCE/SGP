import { motion } from 'framer-motion';
import './SuccessScreen.css';

const SuccessScreen = ({ onRestart }) => {
  return (
    <motion.div
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti */}
      <div className="confetti-container">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: 0
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 0.5,
              repeat: Infinity,
              repeatDelay: Math.random()
            }}
            style={{
              background: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'][i % 5],
              width: 10 + Math.random() * 10,
              height: 10 + Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Success Card */}
      <motion.div
        className="success-card"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
      >
        <motion.div
          className="success-emoji"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          🎉
        </motion.div>

        <h1 className="success-title">વાહ!</h1>
        <p className="success-message">તમે સરસ ખરીદી કરી!</p>

        <motion.button
          className="restart-button"
          onClick={onRestart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ફરીથી રમો 🔄
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessScreen;
