import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ShoppingCart.css';

const ShoppingCart = ({ shoppingList, collectedItems, cartBounce }) => {
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    if (cartBounce) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 500);
    }
  }, [cartBounce]);

  const getCollectedCount = (itemId) => {
    return collectedItems.filter(i => i.id === itemId).length;
  };

  const isItemComplete = (listItem) => {
    return getCollectedCount(listItem.id) >= listItem.quantity;
  };

  return (
    <div className="cart-container">
      {/* Shopping List */}
      <div className="shopping-list">
        <div className="list-title">ખરીદી યાદી</div>
        <div className="list-items">
          {shoppingList.map((listItem) => {
            const collected = getCollectedCount(listItem.id);
            const complete = isItemComplete(listItem);
            
            return (
              <motion.div
                key={listItem.id}
                className={`list-item ${complete ? 'complete' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="list-emoji">{listItem.emoji}</span>
                <span className="list-name">{listItem.name}</span>
                <span className="list-count">
                  {collected}/{listItem.quantity}
                </span>
                {complete && <span className="checkmark">✓</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cart Visual */}
      <motion.div
        className={`cart-visual ${cartBounce ? 'bounce' : ''}`}
        animate={cartBounce ? { y: [-10, 0, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="cart-basket">
          <div className="basket-handle"></div>
          <div className="basket-body">
            {/* Items in cart */}
            <div className="cart-items">
              {collectedItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="cart-item"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.1
                  }}
                >
                  {item.emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sparkle effect */}
        {showSparkle && (
          <div className="sparkles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [1, 1, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 40,
                  y: Math.sin(i * 60 * Math.PI / 180) * 40
                }}
                transition={{ duration: 0.6 }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ShoppingCart;
