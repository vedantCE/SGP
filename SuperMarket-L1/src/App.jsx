import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Product from './components/Product';
import Shelf from './components/Shelf';
import Basket from './components/Basket';
import PurchaseList from './components/PurchaseList';
import SuccessAnimation from './components/SuccessAnimation';
import { products, categories } from './data/gameData';

function App() {
  const [collectedItems, setCollectedItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); // For math success checking

  // Get basket drop zone coordinates (larger area for easier dropping)
  const getBasketZone = () => {
    return {
      x: { min: 0, max: 350 },
      y: { min: window.innerHeight - 300, max: window.innerHeight }
    };
  };

  // Check if drop point is within basket zone
  const isInBasketZone = (point) => {
    const zone = getBasketZone();
    return (
      point.x >= zone.x.min && 
      point.x <= zone.x.max &&
      point.y >= zone.y.min &&
      point.y <= zone.y.max
    );
  };

  const addItemToBasket = (product, startPoint) => {
    // Create flying animation
    setFlyingItem({
      product,
      from: startPoint,
      to: { x: 100, y: window.innerHeight - 100 } // Target basket center roughly
    });

    // After animation, add to basket
    setTimeout(() => {
      setCollectedItems(prev => [...prev, product]);
      setFlyingItem(null);
    }, product.animation === 'fade' ? 600 : product.animation === 'spin' ? 700 : 800);
  };

  const handleProductDragEnd = (product, dropPoint) => {
    if (isInBasketZone(dropPoint)) {
      addItemToBasket(product, dropPoint);
    }
  };

  const handleProductClick = (product, startPoint) => {
    addItemToBasket(product, startPoint);
  };

  const handleVerifyTotal = (success) => {
    if (success) {
      setIsSuccess(true);
      // Play a small sound or confetti could happen here
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };
  
  const isProductCollected = (productId) => {
    // We no longer hide collected items, so this is just for reference/unused
    return false; // Always show items
  };

  // Group products by shelf
  const productsByShelf = {
    A: products.filter(p => p.shelf === 'A'),
    B: products.filter(p => p.shelf === 'B'),
    C: products.filter(p => p.shelf === 'C')
  };

  return (
    <div className="supermarket-scene">
      {/* Background elements */}
      <div className="ceiling-lights">
        <div className="light-beam light-1"></div>
        <div className="light-beam light-2"></div>
        <div className="light-beam light-3"></div>
        <div className="light-beam light-4"></div>
      </div>

      {/* Main content */}
      <div className="store-content">
        <h1 className="store-title">🛒 સુપરમાર્કેટ</h1>

        {/* Shelves */}
        <div className="shelves-container">
          <Shelf shelfId="A" shelfName={categories.fruits.name}>
            {productsByShelf.A.map(product => (
              <Product
                key={product.id}
                product={product}
                onDragEnd={handleProductDragEnd}
                onProductClick={handleProductClick}
              />
            ))}
          </Shelf>

          <Shelf shelfId="B" shelfName={categories.beverages.name}>
            {productsByShelf.B.map(product => (
              <Product
                key={product.id}
                product={product}
                onDragEnd={handleProductDragEnd}
                onProductClick={handleProductClick}
              />
            ))}
          </Shelf>

          <Shelf shelfId="C" shelfName={categories.snacks.name}>
            {productsByShelf.C.map(product => (
              <Product
                key={product.id}
                product={product}
                onDragEnd={handleProductDragEnd}
                onProductClick={handleProductClick}
              />
            ))}
          </Shelf>
        </div>
      </div>

      {/* Purchase List & Math Check Panel */}
      <PurchaseList 
        purchasedItems={collectedItems}
        onVerifyTotal={handleVerifyTotal}
      />

      {/* Flying item animation */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            className={`flying-item ${flyingItem.product.animation}`}
            initial={{ 
              x: flyingItem.from.x,
              y: flyingItem.from.y
            }}
            style={{
              '--start-x': `${flyingItem.from.x}px`,
              '--start-y': `${flyingItem.from.y}px`,
              '--mid-x': `${(flyingItem.from.x + flyingItem.to.x) / 2}px`,
              '--mid-y': `${flyingItem.from.y - 100}px`,
              '--end-x': `${flyingItem.to.x}px`,
              '--end-y': `${flyingItem.to.y}px`
            }}
          >
            {flyingItem.product.emoji}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Basket (bottom-left) */}
      <Basket 
        collectedItems={collectedItems}
        lastDroppedAnimation={flyingItem?.product.animation}
      />

      {/* Celebration Animation Overlay */}
      <SuccessAnimation 
        show={isSuccess} 
        onComplete={() => setIsSuccess(false)} 
      />
    </div>
  );
}

export default App;
