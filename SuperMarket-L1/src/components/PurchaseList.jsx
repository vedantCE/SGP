import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PurchaseList.css';

const PurchaseList = ({ purchasedItems, onVerifyTotal }) => {
  const [userTotal, setUserTotal] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null

  // Reset total and feedback when items change
  useEffect(() => {
    setUserTotal('');
    setFeedback(null);
  }, [purchasedItems]);

  const calculateActualTotal = () => {
    return purchasedItems.reduce((sum, item) => sum + item.price, 0);
  };

  const handleCheck = () => {
    const actualTotal = calculateActualTotal();
    const userValue = parseInt(userTotal, 10);

    if (isNaN(userValue)) return;

    if (userValue === actualTotal) {
      setFeedback('correct');
      onVerifyTotal(true);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 3000); // Clear incorrect feedback after 3s
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="purchase-list-container">
      <div className="purchase-header">
        <h3>🛍️ ખરીદેલી વસ્તુઓ</h3>
      </div>

      <div className="items-scroll-area">
        <AnimatePresence initial={false}>
          {purchasedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="purchase-item-row"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price}</span>
            </motion.div>
          ))}
          {purchasedItems.length === 0 && (
            <div className="empty-message">વસ્તુઓ પસંદ કરો</div>
          )}
        </AnimatePresence>
      </div>

      <div className="total-check-section">
        <label>કુલ રકમ લખો</label>
        <div className="input-group">
          <input
            type="number"
            value={userTotal}
            onChange={(e) => setUserTotal(e.target.value)}
            placeholder="?"
            onKeyPress={handleKeyPress}
            className={feedback === 'correct' ? 'success' : ''}
            disabled={feedback === 'correct'}
          />
          <button 
            onClick={handleCheck}
            className={`check-btn ${feedback || ''}`}
            disabled={purchasedItems.length === 0 || feedback === 'correct'}
          >
            {feedback === 'correct' ? '✓' : 'ગણો'}
          </button>
        </div>
        
        <AnimatePresence>
          {feedback === 'incorrect' && (
            <motion.div 
              className="hint-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ફરી ઉમેરો અને ગણો 🙂
            </motion.div>
          )}
          {feedback === 'correct' && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ખૂબ સરસ! 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PurchaseList;
