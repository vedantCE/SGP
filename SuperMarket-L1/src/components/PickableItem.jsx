import { motion } from 'framer-motion';
import './PickableItem.css';

const PickableItem = ({ item, onPick, isCollected, rackPosition }) => {
  if (isCollected) return null;

  return (
    <motion.div
      className="pickable-item"
      style={{
        position: 'absolute',
        left: rackPosition.x,
        top: rackPosition.y
      }}
      onClick={() => onPick(item)}
      whileHover={{ 
        scale: 1.15,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: item.id * 0.1 }}
    >
      <div className="item-emoji">{item.emoji}</div>
      <div className="item-name">{item.name}</div>
    </motion.div>
  );
};

export default PickableItem;
