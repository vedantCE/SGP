import './Shelf.css';

const Shelf = ({ shelfId, shelfName, children }) => {
  return (
    <div className={`shelf shelf-${shelfId.toLowerCase()}`}>
      <div className="shelf-label">{shelfName}</div>
      <div className="shelf-surface">
        <div className="shelf-products">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Shelf;
