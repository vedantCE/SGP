import './GroceryShelf.css';
import DraggableItem from './DraggableItem';

const GroceryShelf = ({ items, onDragEnd, collectedItems }) => {
  const isItemCollected = (itemId) => {
    return collectedItems.some(item => item.id === itemId);
  };

  return (
    <div className="grocery-shelf">
      <div className="shelf-title">દુકાન</div>
      <div className="shelf-grid">
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            onDragEnd={onDragEnd}
            isCollected={isItemCollected(item.id) && collectedItems.filter(i => i.id === item.id).length >= 
              (item.maxQuantity || 3)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroceryShelf;
