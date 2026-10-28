export const cakes = [
  {
    id: "coriander",
    name: "Coriander Cake",
    img: "/images/cakes/coriander-cake.webp",
    description: "A unique and refreshing cake featuring the distinctive taste of coriander, perfect for those who love bold and innovative flavors.",
    occasions: ["Birthday", "Surprise", "Company Anniversary"],
    sizes: {
      "5-inch": "RM 130",
      "6-inch": "RM 140",
      "8-inch": "RM 180",
      "10-inch": "RM 250"
    },
    defaultSize: "6-inch",
    fixedFlavor: "coriander",
  },
  {
    id: "edible-printing",
    name: "Edible Printing Cake",
    img: "/images/cakes/edible-print-cake.webp",
    description: "Customize your cake with edible printed images, perfect for personal photos, logos, or special messages. High-quality printing that's completely safe to eat.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary", "Company Anniversary"],
    sizes: {
      "5-inch": "RM 130",
      "6-inch": "RM 140",
      "8-inch": "RM 180",
      "10-inch": "RM 250"
    },
    defaultSize: "6-inch",
  },
  {
    id: "flaming",
    name: "Flaming Cake",
    img: "/images/cakes/flaming-cake.webp",
    description: "A dramatic and eye-catching cake featuring a stunning flaming effect. Perfect for making a grand entrance at any celebration.",
    occasions: ["Birthday", "Surprise", "Wedding Anniversary"],
    sizes: {
      "6-inch": "RM 170"
    },
    defaultSize: "6-inch",
  },
  {
    id: "hand-drawn",
    name: "Hand Drawn Design Cake",
    img: "/images/cakes/hand-drawn-cake.webp",
    description: "Artistically decorated with hand-drawn designs, each cake is a unique piece of edible art. Perfect for those seeking a personal touch.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary", "Gender Reveal"],
    sizes: {
      "5-inch": "RM 130",
      "6-inch": "RM 140",
      "8-inch": "RM 180",
      "10-inch": "RM 250"
    },
    defaultSize: "6-inch",
  },
  {
    id: "cake-topper",
    name: "Cake Topper",
    img: "/images/cakes/topper-cake.webp",
    description: "Elegant cakes adorned with beautiful toppers, adding a special touch to your celebration. Choose from various topper designs to match your theme.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary", "Gender Reveal"],
    sizes: {
      "5-inch": "RM 150",
      "6-inch": "RM 160",
      "8-inch": "RM 200",
      "10-inch": "RM 270"
    },
    defaultSize: "6-inch",
  },
  {
    id: "angelic",
    name: "Angelic Cake",
    img: "/images/cakes/angelic-cake.webp",
    description: "A heavenly design featuring delicate angelic elements, perfect for weddings and romantic celebrations. Elegant and sophisticated.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary"],
    sizes: {
      "5-inch": "RM 150",
      "6-inch": "RM 160",
      "8-inch": "RM 200",
      "10-inch": "RM 270"
    },
    defaultSize: "6-inch",
  },
  {
    id: "crystal",
    name: "Crystal Cake",
    img: "/images/cakes/crystal-cake.webp",
    description: "Sparkling and luxurious, this cake features crystal-like decorations that catch the light beautifully. Perfect for elegant celebrations.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary"],
    sizes: {
      "5-inch": "RM 150",
      "6-inch": "RM 160",
      "8-inch": "RM 200",
      "10-inch": "RM 270"
    },
    defaultSize: "6-inch",
  },
  {
    id: "baka",
    name: "Baka Cake",
    img: "/images/cakes/baka-cake.webp",
    description: "A fun and playful cake perfect for casual celebrations. Great for friends and family gatherings with a lighthearted atmosphere.",
    occasions: ["Birthday", "Surprise", "Company Anniversary"],
    sizes: {
      "6-inch": "RM 180"
    },
    defaultSize: "6-inch",
    fixedFlavor: "original",
  },
  {
    id: "calligraphy",
    name: "Calligraphy Cake",
    img: "/images/cakes/caligraphy-cake.webp",
    description: "Elegant cakes featuring beautiful calligraphy designs. Perfect for weddings and formal celebrations where style and sophistication matter.",
    occasions: ["Birthday", "Weddings", "Wedding Anniversary"],
    sizes: {
      "5-inch": "RM 130",
      "6-inch": "RM 140",
      "8-inch": "RM 180",
      "10-inch": "RM 250"
    },
    defaultSize: "6-inch",
  },
  {
    id: "mahjong",
    name: "Mahjong Cake",
    img: "/images/cakes/mahjong-cake.webp",
    description: "A unique cake designed for mahjong enthusiasts. Perfect for game nights and gatherings with friends who love this classic game.",
    occasions: ["Birthday", "Surprise", "Company Anniversary"],
    sizes: {
      "5-inch": "RM 150",
      "6-inch": "RM 160",
      "8-inch": "RM 200",
      "10-inch": "RM 270"
    },
    defaultSize: "6-inch",
  },
];

// Helper function to get cakes by occasion
export const getCakesByOccasion = (occasion) => {
  return cakes.filter(cake => cake.occasions.includes(occasion));
};

// Get all unique occasions
export const getAllOccasions = () => {
  const occasions = new Set();
  cakes.forEach(cake => {
    cake.occasions.forEach(occasion => occasions.add(occasion));
  });
  return Array.from(occasions);
};

// Get all unique flavors
export const getAllFlavors = () => {
  const flavors = new Set();
  cakes.forEach(cake => {
    cake.flavors.forEach(flavor => flavors.add(flavor));
  });
  return Array.from(flavors);
};

// Lowest price across a cake's sizes, e.g. "RM 130"
export const getStartingPrice = (cake) => {
  const prices = Object.values(cake.sizes).map((price) => parseInt(price.replace(/[^0-9]/g, "")));
  return `RM ${Math.min(...prices)}`;
};

// Approximate number of people each size serves
export const sizeServings = {
  "5-inch": "2-4 pax",
  "6-inch": "4-6 pax",
  "8-inch": "8-14 pax",
  "10-inch": "15-25 pax",
};
