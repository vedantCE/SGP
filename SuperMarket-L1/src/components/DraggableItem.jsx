import { motion } from 'framer-motion';
import './DraggableItem.css';

const DraggableItem = ({ item, onDragEnd, isCollected }) => {
  if (isCollected) return null;

  return (
    <motion.div
      className="draggable-item"
      drag
      dragSnapToOrigin
      dragElastic={0.1}
      onDragEnd={(_, info) => onDragEnd(item, info)}
      whileDrag={{ 
        scale: 1.1, 
        rotate: 5,
        zIndex: 100,
        cursor: 'grabbing'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="item-emoji">{item.emoji}</div>
      <div className="item-name">{item.name}</div>
      <div className="item-price">₹{item.price}</div>
    </motion.div>
  );
};

export default DraggableItem;
