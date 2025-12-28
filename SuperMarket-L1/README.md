# 🛒 સુપરમાર્કેટ રમત (Supermarket Learning Game)

A fun, interactive educational game for Gujarati-medium children (ages 6-10) to learn shopping, counting, and matching skills through drag-and-drop gameplay.

## ✨ Features

- 🎮 **Game-Like Interface** - Colorful, engaging design that looks like a kids' game
- 🐘 **Animated Shopkeeper** - Friendly elephant character that reacts to your actions
- 🛍️ **Drag & Drop Shopping** - Intuitive drag-and-drop mechanics (no clicking!)
- 🇮🇳 **Gujarati Language** - Fully localized in Gujarati for regional learners
- 🧠 **ADHD-Friendly** - Calm colors, no timers, no pressure, predictable layout
- 🎉 **Success Celebrations** - Encouraging feedback with animations and confetti
- 📱 **Single Screen** - No scrolling required, everything fits on one screen

## 🎯 Target Users

- Gujarati-medium children
- Ages 6-10
- ADHD-friendly design
- Low reading ability, high visual & interaction need

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173/ in your browser
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Check Shopping List** - Look at the left side to see what items you need
2. **Drag Items** - Grab items from the shop shelves on the right
3. **Drop in Cart** - Drag items to the shopping cart on the left
4. **Watch Avatar** - The shopkeeper will react:
   - ✨ Happy when you add correct items
   - 🤔 Gentle hint when wrong item
5. **Complete List** - Collect all items to see the celebration!

## 🏗️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Smooth animations
- **CSS3** - Styling and keyframe animations
- **Noto Sans Gujarati** - Google Fonts for Gujarati text

## 📁 Project Structure

```
src/
├── components/
│   ├── Avatar.jsx          # Elephant shopkeeper character
│   ├── ShoppingCart.jsx    # Cart and shopping list
│   ├── DraggableItem.jsx   # Individual grocery items
│   ├── GroceryShelf.jsx    # Item grid display
│   └── SuccessScreen.jsx   # Celebration screen
├── data/
│   └── gameData.js         # Game items and shopping list
├── App.jsx                 # Main game logic
├── index.css               # Global styles
└── animations.css          # Animation definitions
```

## 🎨 Design Principles

1. **No Scrolling** - Everything fits in one viewport
2. **No Clicking** - Drag-only interaction for engagement
3. **Big Cart** - Shopping cart is prominent and visually important
4. **Avatar Always Visible** - Character provides constant feedback
5. **Calm & Rounded** - ADHD-friendly aesthetic with soft colors

## 🌟 Game Elements

### Shopping List Items (દુકાન)
- 🥭 કેરી (Mango)
- 🥔 બટાકા (Potato)
- 🥛 દૂધ (Milk)
- 🍌 કેળા (Banana)
- 🥚 ઈંડા (Eggs)
- And more!

### Animations
- Breathing avatar with blinking eyes
- Cart bounce on successful drop
- Sparkle effects
- Confetti celebration
- Smooth drag interactions

## 🧩 Customization

### Add New Items

Edit `src/data/gameData.js`:

```javascript
export const groceryItems = [
  { id: 1, name: "નવી વસ્તુ", emoji: "🎁", price: 50 },
  // Add more items...
];
```

### Change Shopping List

```javascript
export const shoppingList = [
  { id: 1, name: "કેરી", emoji: "🥭", quantity: 2 },
  // Customize list...
];
```

## 📝 License

This project is created for educational purposes.

## 🙏 Credits

- Built with React + Vite
- Animations powered by Framer Motion
- Gujarati font: Noto Sans Gujarati (Google Fonts)
- Created for Gujarati-medium ADHD-friendly children

---

**વાહ! તમે સરસ ખરીદી કરી!** (Great shopping!) 🎉
