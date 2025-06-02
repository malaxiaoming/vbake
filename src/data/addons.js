export const addons = {
  flowers: [
    {
      id: "3-flower-bouquet",
      name: "3-Flower Bouquet",
      description: "Elegant 3-flower bouquet decoration",
      price: "RM 30",
      img: "/images/addons/3-flower-bouquet.svg"
    },
    {
      id: "5-flower-bouquet",
      name: "5-Flower Bouquet",
      description: "Luxurious 5-flower bouquet decoration",
      price: "RM 45",
      img: "/images/addons/5-flower-bouquet.svg"
    },
    {
      id: "hand-bouquet",
      name: "Hand Bouquet",
      description: "Beautiful hand-held flower bouquet",
      price: "RM 55",
      img: "/images/addons/hand-bouquet.svg"
    },
    {
      id: "bouquet-with-bear",
      name: "Bouquet with Bear Doll",
      description: "Hand bouquet with cute teddy bear",
      price: "RM 75",
      img: "/images/addons/bouquet-with-bear.svg"
    },
    {
      id: "flower-basket",
      name: "Flower Basket",
      description: "Elegant flower arrangement in a basket",
      price: "RM 65",
      img: "/images/addons/flower-basket.svg"
    }
  ],
  decorations: [
    {
      id: "pop-up-balloon",
      name: "Pop-up Balloon",
      description: "Surprise pop-up balloon decoration",
      price: "RM 25",
      img: "/images/addons/pop-up-balloon.svg"
    },
    {
      id: "fireworks-candle",
      name: "Fireworks Candle",
      description: "Sparkling fireworks candle effect",
      price: "RM 10",
      img: "/images/addons/fireworks-candle.svg"
    },
    {
      id: "heart-balloon",
      name: "Heart Shape Balloon",
      description: "Romantic heart-shaped balloon decoration",
      price: "RM 20",
      img: "/images/addons/heart-balloon.svg"
    },
    {
      id: "floating-balloons",
      name: "5 Floating Balloons",
      description: "Set of 5 beautiful 12-inch floating balloons",
      price: "RM 35",
      img: "/images/addons/floating-balloons.svg"
    }
  ]
};

// Export a flattened array of all add-ons
export const allAddons = Object.values(addons).flat(); 