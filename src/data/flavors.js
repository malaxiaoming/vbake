export const flavors = {
  standard: [
    {
      id: "chocolate",
      name: "Chocolate",
      price: "RM 0",
      description: "Rich chocolate flavor with chocolate ganache",
      bookingRequirement: null
    },
    {
      id: "cheese",
      name: "Cheese",
      price: "RM 0",
      description: "Creamy cheese cake with graham cracker base",
      bookingRequirement: null
    },
    {
      id: "tiramisu",
      name: "Tiramisu",
      price: "RM 0",
      description: "Coffee-soaked layers with mascarpone cream",
      bookingRequirement: null
    },
    {
      id: "pandan-longan",
      name: "Pandan-Longan",
      price: "RM 0",
      description: "Traditional pandan flavor with fresh longan fruits",
      bookingRequirement: null
    },
    {
      id: "rose-lychee",
      name: "Rose-Lychee",
      price: "RM 0",
      description: "Delicate rose flavor with lychee cream and fresh lychee",
      bookingRequirement: null
    },
    {
      id: "oreo",
      name: "Oreo",
      price: "RM 0",
      description: "Classic oreo flavor with oreo cream and cookie pieces",
      bookingRequirement: null
    },
    {
      id: "black-plum",
      name: "Black Plum",
      price: "RM 0",
      description: "Fresh black plum flavor with plum cream",
      bookingRequirement: null
    },
    {
      id: "blueberry-chocolate",
      name: "Blueberry Chocolate",
      price: "RM 0",
      description: "Chocolate cake with blueberry filling and cream",
      bookingRequirement: null
    },
    {
      id: "oreo-chocolate",
      name: "Oreo Chocolate",
      price: "RM 0",
      description: "Chocolate cake with oreo cream and cookie pieces",
      bookingRequirement: null
    },
    {
      id: "coconut-pandan",
      name: "Coconut Pandan",
      price: "RM 0",
      description: "Traditional pandan flavor with coconut cream",
      bookingRequirement: null
    },
    {
      id: "mango-longan-pandan",
      name: "Mango Longan Pandan",
      price: "RM 0",
      description: "Pandan cake with mango and longan fruits",
      bookingRequirement: null
    },
    {
      id: "lemon",
      name: "Lemon",
      price: "RM 0",
      description: "Fresh lemon flavor with lemon cream",
      bookingRequirement: null
    },
    {
      id: "single-fruit",
      name: "Single Fruit",
      price: "RM 0",
      description: "Choice of single fruit flavor with fresh fruits",
      bookingRequirement: null
    }
  ],
  premium: [
    {
      id: "mango",
      name: "Mango",
      price: "RM 20",
      description: "Fresh mango flavor with mango cream",
      bookingRequirement: null
    },
    {
      id: "pandan",
      name: "Pandan",
      price: "RM 20",
      description: "Traditional pandan flavor with coconut cream",
      bookingRequirement: null
    },
    {
      id: "mix-fresh-fruit",
      name: "Mix Fresh Fruit",
      price: "RM 20",
      description: "Combination of fresh seasonal fruits",
      bookingRequirement: null
    },
    {
      id: "hazelnut-ganache-chocolate",
      name: "Hazelnut Ganache Chocolate",
      price: "RM 20",
      description: "Chocolate cake with hazelnut ganache",
      bookingRequirement: null
    },
    {
      id: "burnt-cheesecake",
      name: "Burnt Cheesecake",
      price: "RM 20",
      description: "Japanese-style burnt cheesecake",
      bookingRequirement: null
    },
    {
      id: "chocolate-cheesecake",
      name: "Chocolate Cheesecake",
      price: "RM 20",
      description: "Chocolate-flavored cheesecake",
      bookingRequirement: null
    },
    {
      id: "blueberry-cheesecake",
      name: "Blueberry Cheesecake",
      price: "RM 20",
      description: "Cheesecake with blueberry topping",
      bookingRequirement: null
    }
  ],
  luxury: [
    {
      id: "opera",
      name: "Opera",
      price: "RM 40",
      description: "Layers of almond sponge, coffee buttercream, and chocolate ganache",
      bookingRequirement: null
    },
    {
      id: "black-forest",
      name: "Black Forest",
      price: "RM 40",
      description: "Chocolate cake with cherry filling and whipped cream",
      bookingRequirement: "5 days advance booking"
    },
    {
      id: "matcha",
      name: "Matcha",
      price: "RM 40",
      description: "Premium matcha flavor with matcha cream",
      bookingRequirement: null
    },
    {
      id: "salted-caramel",
      name: "Salted Caramel",
      price: "RM 40",
      description: "Caramel cake with salted caramel filling",
      bookingRequirement: null
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