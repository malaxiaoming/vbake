// Options for the experimental cake builder (/cake-builder).
// Taken from the current flavour list; to be confirmed with the bakery before going live.
// Colours drive the hand-drawn cake illustrations.

export const cakeBodies = [
  { id: "original", name: "Original", chinese: "原味", sponge: "#f3d48e", crumb: "#d9ae5c" },
  { id: "chocolate", name: "Chocolate", chinese: "巧克力", sponge: "#6b4330", crumb: "#3f2519" },
  { id: "pandan", name: "Pandan", chinese: "班兰", sponge: "#a9c96b", crumb: "#78963f" },
  { id: "matcha", name: "Matcha", chinese: "抹茶", sponge: "#9bb06a", crumb: "#6c8040" },
];

// `cream` is the filling colour; `bits` adds fruit or cookie pieces
export const cakeFillings = [
  { id: "fresh-cream", name: "Fresh Cream", chinese: "鲜奶油", cream: "#fbf4e6" },
  { id: "black-plum", name: "Black Plum", chinese: "黑李", cream: "#d8b3c6", bits: "#5e2747" },
  { id: "blueberry", name: "Blueberry", chinese: "蓝莓", cream: "#cfc7e6", bits: "#3b3f8f" },
  { id: "oreo", name: "Oreo", chinese: "奥利奥", cream: "#efe9df", bits: "#2b2220" },
  { id: "longan", name: "Longan", chinese: "龙眼", cream: "#f6ecd2", bits: "#e9dcb4" },
  { id: "rose-lychee", name: "Rose-Lychee", chinese: "玫瑰荔枝", cream: "#f6cfd6", bits: "#fbf1ec" },
  { id: "lemon", name: "Lemon", chinese: "柠檬", cream: "#f8ea9a" },
  { id: "mango", name: "Mango", chinese: "芒果", cream: "#fbe3a5", bits: "#f2a93b" },
  { id: "strawberry", name: "Strawberry", chinese: "草莓", cream: "#f8d6d6", bits: "#d9384a" },
];

// One-tier sizes. Prices are the standard cake prices for now (to be confirmed by the bakery).
export const singleTierSizes = [
  { id: "5-inch", label: '5"', price: 130 },
  { id: "6-inch", label: '6"', price: 140 },
  { id: "8-inch", label: '8"', price: 180 },
  { id: "10-inch", label: '10"', price: 250 },
];

// Two-tier combinations: the smaller tier always sits on top
export const twoTierSizes = [
  { id: "6+8", label: '6" + 8"', top: "6-inch", bottom: "8-inch", price: 350 },
  { id: "6+10", label: '6" + 10"', top: "6-inch", bottom: "10-inch", price: 400 },
  { id: "8+10", label: '8" + 10"', top: "8-inch", bottom: "10-inch", price: 450 },
];
