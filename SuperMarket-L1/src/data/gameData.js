// Supermarket Shopping Game - Product Database
// 12 products across 3 categories with unique animations

export const products = [
  // FRUITS CATEGORY
  {
    id: 1,
    name: "સફરજન",
    nameEn: "Apple",
    emoji: "🍎",
    category: "fruits",
    price: 80,
    shelf: "A",
    position: { row: 1, col: 1 },
    animation: "bounce"
  },
  {
    id: 2,
    name: "કેળું",
    nameEn: "Banana",
    emoji: "🍌",
    category: "fruits",
    price: 40,
    shelf: "A",
    position: { row: 1, col: 2 },
    animation: "spin"
  },
  {
    id: 3,
    name: "સંતરા",
    nameEn: "Orange",
    emoji: "🍊",
    category: "fruits",
    price: 60,
    shelf: "A",
    position: { row: 1, col: 3 },
    animation: "bounce"
  },
  {
    id: 4,
    name: "દ્રાક્ષ",
    nameEn: "Grapes",
    emoji: "🍇",
    category: "fruits",
    price: 100,
    shelf: "A",
    position: { row: 1, col: 4 },
    animation: "scale"
  },

  // BEVERAGES CATEGORY
  {
    id: 5,
    name: "દૂધ",
    nameEn: "Milk",
    emoji: "🥛",
    category: "beverages",
    price: 25,
    shelf: "B",
    position: { row: 2, col: 1 },
    animation: "fade"
  },
  {
    id: 6,
    name: "જ્યુસ",
    nameEn: "Juice",
    emoji: "🧃",
    category: "beverages",
    price: 35,
    shelf: "B",
    position: { row: 2, col: 2 },
    animation: "spin"
  },
  {
    id: 7,
    name: "સોડા",
    nameEn: "Soda",
    emoji: "🥤",
    category: "beverages",
    price: 30,
    shelf: "B",
    position: { row: 2, col: 3 },
    animation: "bounce"
  },
  {
    id: 8,
    name: "પાણી",
    nameEn: "Water",
    emoji: "💧",
    category: "beverages",
    price: 20,
    shelf: "B",
    position: { row: 2, col: 4 },
    animation: "fade"
  },

  // SNACKS CATEGORY
  {
    id: 9,
    name: "કૂકીઝ",
    nameEn: "Cookies",
    emoji: "🍪",
    category: "snacks",
    price: 50,
    shelf: "C",
    position: { row: 3, col: 1 },
    animation: "scale"
  },
  {
    id: 10,
    name: "ચોકલેટ",
    nameEn: "Chocolate",
    emoji: "🍫",
    category: "snacks",
    price: 75,
    shelf: "C",
    position: { row: 3, col: 2 },
    animation: "spin"
  },
  {
    id: 11,
    name: "ચિપ્સ",
    nameEn: "Chips",
    emoji: "🥨",
    category: "snacks",
    price: 45,
    shelf: "C",
    position: { row: 3, col: 3 },
    animation: "bounce"
  },
  {
    id: 12,
    name: "પોપકોર્ન",
    nameEn: "Popcorn",
    emoji: "🍿",
    category: "snacks",
    price: 40,
    shelf: "C",
    position: { row: 3, col: 4 },
    animation: "scale"
  }
];

export const categories = {
  fruits: { name: "ફળો", color: "#4caf50" },
  beverages: { name: "પીણાં", color: "#2196f3" },
  snacks: { name: "નાસ્તો", color: "#ff9800" }
};
