export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'breakfast' | 'main-course' | 'rice' | 'curries' | 'snacks' | 'desserts';
  rating: number;
  reviews: number;
  isVeg: boolean;
  spiceLevel: 1 | 2 | 3;
  tags: string[];
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  prepTime?: number;
}

export const menuItems: MenuItem[] = [
  // Breakfast Items
  {
    id: 'breakfast-1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato curry, served with coconut chutney and sambar',
    price: 149,
    originalPrice: 179,
    image: '/masala_dosa.webp',
    category: 'breakfast',
    rating: 4.8,
    reviews: 2341,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Popular', 'Traditional'],
    calories: 320,
    prepTime: 15
  },
  {
    id: 'breakfast-2',
    name: 'Idli Sambar',
    description: 'Soft steamed rice cakes served with lentil soup and coconut chutney',
    price: 89,
    image: '/idli_sambar.webp',
    category: 'breakfast',
    rating: 4.7,
    reviews: 1856,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Healthy', 'Light'],
    calories: 180,
    prepTime: 10
  },
  {
    id: 'breakfast-3',
    name: 'Vada Sambar',
    description: 'Deep-fried lentil donuts soaked in tangy sambar with coconut chutney',
    price: 99,
    image: '/sambar_vada.webp',
    category: 'breakfast',
    rating: 4.6,
    reviews: 983,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Comfort Food'],
    calories: 280,
    prepTime: 12
  },
  {
    id: 'breakfast-4',
    name: 'Rava Upma',
    description: 'Semolina porridge with vegetables, curry leaves and mustard seeds',
    price: 79,
    image: '/rava_upma.webp',
    category: 'breakfast',
    rating: 4.4,
    reviews: 742,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Healthy'],
    calories: 220,
    prepTime: 15
  },

  // Rice & Biryani
  {
    id: 'rice-1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and authentic spices',
    price: 299,
    originalPrice: 349,
    image: '/chicken_biriyani.webp',
    category: 'rice',
    rating: 4.9,
    reviews: 3421,
    isVeg: false,
    spiceLevel: 3,
    tags: ['Bestseller', 'Spicy'],
    calories: 580,
    prepTime: 45
  },
  {
    id: 'rice-2',
    name: 'Mutton Biryani',
    description: 'Fragrant basmati rice layered with succulent mutton pieces and saffron',
    price: 399,
    originalPrice: 449,
    image: '/mutton_biriyani.webp',
    category: 'rice',
    rating: 4.8,
    reviews: 1654,
    isVeg: false,
    spiceLevel: 3,
    tags: ['Premium', 'Spicy'],
    calories: 650,
    prepTime: 60
  },
  {
    id: 'rice-3',
    name: 'Vegetable Biryani',
    description: 'Aromatic rice with mixed vegetables, paneer and fragrant biryani spices',
    price: 249,
    image: '/veg_biriyani.webp',
    category: 'rice',
    rating: 4.5,
    reviews: 892,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Vegetarian'],
    calories: 420,
    prepTime: 35
  },
  {
    id: 'rice-4',
    name: 'Curd Rice',
    description: 'Comforting rice mixed with yogurt, tempered with curry leaves and mustard',
    price: 119,
    image: '/curd_rice.webp',
    category: 'rice',
    rating: 4.3,
    reviews: 567,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Comfort Food', 'Cooling'],
    calories: 280,
    prepTime: 10
  },

  // Main Course
  {
    id: 'main-1',
    name: 'Ghee Roast Chicken',
    description: 'Mangalorean style chicken roasted in ghee with aromatic spices',
    price: 329,
    image: '/ghee_roast_chicken.webp',
    category: 'main-course',
    rating: 4.7,
    reviews: 1234,
    isVeg: false,
    spiceLevel: 3,
    tags: ['Spicy', 'Coastal'],
    calories: 480,
    prepTime: 25
  },
  {
    id: 'main-2',
    name: 'Malabar Fish Curry',
    description: 'Kerala-style fish curry cooked in coconut milk with curry leaves',
    price: 279,
    image: '/fish_curry.webp',
    category: 'main-course',
    rating: 4.6,
    reviews: 987,
    isVeg: false,
    spiceLevel: 2,
    tags: ['Coastal', 'Authentic'],
    calories: 380,
    prepTime: 30
  },

  // Curries
  {
    id: 'curry-1',
    name: 'Sambar',
    description: 'Traditional lentil curry with vegetables and tamarind',
    price: 89,
    image: '/sambar.webp',
    category: 'curries',
    rating: 4.5,
    reviews: 1567,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Traditional', 'Healthy'],
    calories: 150,
    prepTime: 20
  },
  {
    id: 'curry-2',
    name: 'Rasam',
    description: 'Tangy tomato-based soup with tamarind and spices',
    price: 69,
    image: '/rasam.webp',
    category: 'curries',
    rating: 4.4,
    reviews: 892,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Comfort Food', 'Digestive'],
    calories: 80,
    prepTime: 15
  },

  // Snacks
  {
    id: 'snack-1',
    name: 'Masala Vadai',
    description: 'Crispy lentil fritters with onions and green chilies',
    price: 59,
    image: '/masala_vada.webp',
    category: 'snacks',
    rating: 4.3,
    reviews: 445,
    isVeg: true,
    spiceLevel: 2,
    tags: ['Crispy', 'Tea Time'],
    calories: 180,
    prepTime: 12
  },
  {
    id: 'snack-2',
    name: 'Banana Chips',
    description: 'Crispy Kerala-style banana chips fried in coconut oil',
    price: 79,
    image: '/banana_chips.webp',
    category: 'snacks',
    rating: 4.2,
    reviews: 334,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Crispy', 'Traditional'],
    calories: 160,
    prepTime: 8
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Payasam',
    description: 'Traditional South Indian rice pudding with jaggery and coconut milk',
    price: 89,
    image: '/payasam.webp',
    category: 'desserts',
    rating: 4.6,
    reviews: 678,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Sweet', 'Traditional'],
    calories: 250,
    prepTime: 12
  },
  {
    id: 'dessert-2',
    name: 'Mysore Pak',
    description: 'Rich and sweet confection made with ghee, sugar, and gram flour',
    price: 129,
    image: '/mysore_pak.webp',
    category: 'desserts',
    rating: 4.5,
    reviews: 423,
    isVeg: true,
    spiceLevel: 1,
    tags: ['Sweet', 'Festival Special'],
    calories: 320,
    prepTime: 15
  }
];