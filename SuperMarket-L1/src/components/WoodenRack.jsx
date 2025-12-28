import './WoodenRack.css';

const WoodenRack = () => {
  return (
    <div className="wooden-rack">
      {/* Rack frame */}
      <div className="rack-frame">
        {/* Vertical posts */}
        <div className="post post-left"></div>
        <div className="post post-right"></div>
        
        {/* Horizontal shelves */}
        <div className="shelf shelf-top"></div>
        <div className="shelf shelf-bottom"></div>
        
        {/* Back panel */}
        <div className="back-panel"></div>
      </div>
    </div>
  );
};

export default WoodenRack;
