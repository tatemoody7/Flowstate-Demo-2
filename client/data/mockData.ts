export interface Place {
  id: string;
  name: string;
  category: "restaurant" | "gym" | "grocery";
  image: string;
  distance: string;
  rating: number;
  studentDiscount?: string;
  address: string;
  hours: string;
  description: string;
  priceLevel: number;
}

export interface ScannedFood {
  id: string;
  name: string;
  brand: string;
  image: string;
  healthScore: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  prices: { store: string; price: number }[];
}

export const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Fresh Kitchen",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    distance: "0.3 mi",
    rating: 4.7,
    studentDiscount: "15% off with student ID",
    address: "10501 FGCU Blvd S, Fort Myers, FL",
    hours: "10am - 9pm",
    description: "Fresh, customizable bowls and smoothies made with local ingredients.",
    priceLevel: 2,
  },
  {
    id: "2",
    name: "Protein House",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    distance: "0.5 mi",
    rating: 4.5,
    studentDiscount: "Free drink with meal",
    address: "12345 University Pkwy, Fort Myers, FL",
    hours: "7am - 10pm",
    description: "High-protein meals designed for athletes and health-conscious students.",
    priceLevel: 2,
  },
  {
    id: "3",
    name: "Green Leaf Cafe",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    distance: "0.8 mi",
    rating: 4.8,
    studentDiscount: "10% off all orders",
    address: "9876 Campus Way, Fort Myers, FL",
    hours: "8am - 8pm",
    description: "Plant-based cafe with organic ingredients and sustainable practices.",
    priceLevel: 2,
  },
  {
    id: "4",
    name: "FGCU Recreation Center",
    category: "gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    distance: "0.1 mi",
    rating: 4.9,
    studentDiscount: "Free for students",
    address: "FGCU Campus, Fort Myers, FL",
    hours: "6am - 11pm",
    description: "State-of-the-art fitness facility with pools, courts, and group classes.",
    priceLevel: 0,
  },
  {
    id: "5",
    name: "Iron Paradise Gym",
    category: "gym",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    distance: "1.2 mi",
    rating: 4.6,
    studentDiscount: "$25/month student rate",
    address: "4567 Gym Road, Fort Myers, FL",
    hours: "24/7",
    description: "24-hour gym with heavy lifting equipment and personal training.",
    priceLevel: 1,
  },
  {
    id: "6",
    name: "Yoga Flow Studio",
    category: "gym",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
    distance: "0.9 mi",
    rating: 4.7,
    studentDiscount: "First class free",
    address: "7890 Zen Way, Fort Myers, FL",
    hours: "6am - 9pm",
    description: "Peaceful yoga studio offering various styles from beginner to advanced.",
    priceLevel: 2,
  },
  {
    id: "7",
    name: "Publix Super Market",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    distance: "0.4 mi",
    rating: 4.5,
    address: "11111 Market Blvd, Fort Myers, FL",
    hours: "7am - 10pm",
    description: "Full-service grocery with deli, bakery, and pharmacy.",
    priceLevel: 2,
  },
  {
    id: "8",
    name: "Trader Joe's",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    distance: "1.5 mi",
    rating: 4.8,
    address: "2222 Trade Ave, Fort Myers, FL",
    hours: "8am - 9pm",
    description: "Unique groceries at great prices with friendly crew members.",
    priceLevel: 2,
  },
  {
    id: "9",
    name: "Whole Foods Market",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400",
    distance: "2.1 mi",
    rating: 4.6,
    studentDiscount: "Extra 10% off sale items",
    address: "3333 Organic Lane, Fort Myers, FL",
    hours: "8am - 10pm",
    description: "Premium organic and natural foods with prepared meals.",
    priceLevel: 3,
  },
];

export const mockScannedFoods: ScannedFood[] = [
  {
    id: "f1",
    name: "Greek Yogurt",
    brand: "Chobani",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    healthScore: 85,
    calories: 120,
    protein: 15,
    carbs: 8,
    fat: 3,
    fiber: 0,
    sugar: 6,
    sodium: 55,
    prices: [
      { store: "Publix", price: 1.49 },
      { store: "Trader Joe's", price: 1.29 },
      { store: "Whole Foods", price: 1.79 },
    ],
  },
  {
    id: "f2",
    name: "Protein Bar",
    brand: "RXBAR",
    image: "https://images.unsplash.com/photo-1622484211148-c4c72d4e21c5?w=400",
    healthScore: 72,
    calories: 210,
    protein: 12,
    carbs: 24,
    fat: 9,
    fiber: 5,
    sugar: 13,
    sodium: 150,
    prices: [
      { store: "Publix", price: 2.99 },
      { store: "Trader Joe's", price: 2.49 },
      { store: "Whole Foods", price: 3.29 },
    ],
  },
  {
    id: "f3",
    name: "Almond Butter",
    brand: "Justin's",
    image: "https://images.unsplash.com/photo-1612187209234-c15cc9ef8b8f?w=400",
    healthScore: 78,
    calories: 190,
    protein: 7,
    carbs: 6,
    fat: 17,
    fiber: 3,
    sugar: 2,
    sodium: 0,
    prices: [
      { store: "Publix", price: 8.99 },
      { store: "Trader Joe's", price: 7.49 },
      { store: "Whole Foods", price: 9.49 },
    ],
  },
];

export const categories = [
  { id: "all", label: "All", icon: "grid" as const },
  { id: "restaurant", label: "Restaurants", icon: "coffee" as const },
  { id: "gym", label: "Gyms", icon: "activity" as const },
  { id: "grocery", label: "Groceries", icon: "shopping-cart" as const },
];
