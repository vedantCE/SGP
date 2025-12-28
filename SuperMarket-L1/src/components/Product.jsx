import { motion } from 'framer-motion';
import { useState } from 'react';
import './Product.css';

const Product = ({ product, onDragEnd, onProductClick }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Removed isCollected check to allow multiple purchases of same item

  const handleClick = (e) => {
    // Only trigger click if we weren't just dragging
    if (!isDragging && onProductClick) {
      const rect = e.currentTarget.getBoundingClientRect();
      // Center of the card for animation start
      const centerPoint = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      onProductClick(product, centerPoint);
    }
  };

  return (
    <motion.div
      className="product"
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ 
        scale: 1.2, 
        zIndex: 1000,
        cursor: 'grabbing',
        rotate: isDragging ? [0, -5, 5, -5, 0] : 0
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        onDragEnd(product, info.point);
      }}
      onClick={handleClick}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4,
        delay: product.id * 0.05,
        type: 'spring',
        stiffness: 200
      }}
    >
      <div className="product-glow"></div>
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">₹{product.price}</div>
    </motion.div>
  );
};

export default Product;
