export const flavors = {
  standard: [
    {
      id: "chocolate",
      name: "Chocolate",
      price: "RM 0",
      description: "Rich chocolate flavor with chocolate ganache"
    },
    {
      id: "cheese",
      name: "Cheese",
      price: "RM 0",
      description: "Creamy cheese cake with graham cracker base"
    },
    {
      id: "tiramisu",
      name: "Tiramisu",
      price: "RM 0",
      description: "Coffee-soaked layers with mascarpone cream"
    },
    {
      id: "pandan-longan",
      name: "Pandan-Longan",
      price: "RM 0",
      description: "Traditional pandan flavor with fresh longan fruits"
    },
    {
      id: "rose-lychee",
      name: "Rose-Lychee",
      price: "RM 0",
      description: "Delicate rose flavor with lychee cream and fresh lychee"
    },
    {
      id: "oreo",
      name: "Oreo",
      price: "RM 0",
      description: "Classic oreo flavor with oreo cream and cookie pieces"
    },
    {
      id: "black-plum",
      name: "Black Plum",
      price: "RM 0",
      description: "Fresh black plum flavor with plum cream"
    },
    {
      id: "blueberry-chocolate",
      name: "Blueberry Chocolate",
      price: "RM 0",
      description: "Chocolate cake with blueberry filling and cream"
    },
    {
      id: "oreo-chocolate",
      name: "Oreo Chocolate",
      price: "RM 0",
      description: "Chocolate cake with oreo cream and cookie pieces"
    },
    {
      id: "coconut-pandan",
      name: "Coconut Pandan",
      price: "RM 0",
      description: "Traditional pandan flavor with coconut cream"
    },
    {
      id: "mango-longan-pandan",
      name: "Mango Longan Pandan",
      price: "RM 0",
      description: "Pandan cake with mango and longan fruits"
    },
    {
      id: "lemon",
      name: "Lemon",
      price: "RM 0",
      description: "Fresh lemon flavor with lemon cream"
    },
    {
      id: "single-fruit",
      name: "Single Fruit",
      price: "RM 0",
      description: "Choice of single fruit flavor with fresh fruits"
    }
  ],
  premium: [
    {
      id: "mango",
      name: "Mango",
      price: "RM 20",
      description: "Fresh mango flavor with mango cream"
    },
    {
      id: "pandan",
      name: "Pandan",
      price: "RM 20",
      description: "Traditional pandan flavor with coconut cream"
    },
    {
      id: "mix-fresh-fruit",
      name: "Mix Fresh Fruit",
      price: "RM 20",
      description: "Combination of fresh seasonal fruits"
    },
    {
      id: "hazelnut-ganache-chocolate",
      name: "Hazelnut Ganache Chocolate",
      price: "RM 20",
      description: "Chocolate cake with hazelnut ganache"
    },
    {
      id: "burnt-cheesecake",
      name: "Burnt Cheesecake",
      price: "RM 20",
      description: "Japanese-style burnt cheesecake"
    },
    {
      id: "chocolate-cheesecake",
      name: "Chocolate Cheesecake",
      price: "RM 20",
      description: "Chocolate-flavored cheesecake"
    },
    {
      id: "blueberry-cheesecake",
      name: "Blueberry Cheesecake",
      price: "RM 20",
      description: "Cheesecake with blueberry topping"
    }
  ],
  luxury: [
    {
      id: "opera",
      name: "Opera",
      price: "RM 40",
      description: "Layers of almond sponge, coffee buttercream, and chocolate ganache"
    },
    {
      id: "black-forest",
      name: "Black Forest",
      price: "RM 40",
      description: "Chocolate cake with cherry filling and whipped cream"
    },
    {
      id: "matcha",
      name: "Matcha",
      price: "RM 40",
      description: "Premium matcha flavor with matcha cream"
    },
    {
      id: "salted-caramel",
      name: "Salted Caramel",
      price: "RM 40",
      description: "Caramel cake with salted caramel filling"
    }
  ]
};

// Helper function to get all flavors
export const getAllFlavors = () => {
  return Object.values(flavors).flat();
};

// Helper function to get flavors by category
export const getFlavorsByCategory = (category) => {
  return flavors[category] || [];
};

// Helper function to get flavor by ID
export const getFlavorById = (id) => {
  return getAllFlavors().find(flavor => flavor.id === id);
}; 