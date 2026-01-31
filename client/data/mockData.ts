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
    name: "CAVA",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    distance: "2.8 mi",
    rating: 4.7,
    studentDiscount: "10% off with student ID",
    address: "6881 Daniels Pkwy, Ste 100, Fort Myers, FL",
    hours: "10:45am - 10pm",
    description: "Customizable Mediterranean grain bowls with fresh greens and grilled proteins. Gluten-free and vegetarian options available.",
    priceLevel: 2,
  },
  {
    id: "2",
    name: "PokéBowl Cafe",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1546069901-5ec87c0f1949?w=400",
    distance: "4.2 mi",
    rating: 4.9,
    studentDiscount: "Free miso soup with bowl",
    address: "12001 S Cleveland Ave, Fort Myers, FL",
    hours: "11am - 9pm",
    description: "Fresh Hawaiian-style poke bowls with sushi-grade fish delivered daily. Build your own with healthy toppings.",
    priceLevel: 2,
  },
  {
    id: "3",
    name: "CAVA Gulf Coast",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    distance: "5.1 mi",
    rating: 4.6,
    studentDiscount: "10% off with student ID",
    address: "16441 Corporate Commerce Way, Ste 100, Fort Myers, FL",
    hours: "10:45am - 10pm",
    description: "Mediterranean fast-casual with house-made dips, grains, and greens. Perfect for meal prep.",
    priceLevel: 2,
  },
  {
    id: "4",
    name: "Ada's Natural Market",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
    distance: "6.3 mi",
    rating: 4.5,
    studentDiscount: "15% off smoothies",
    address: "15271 McGregor Blvd, Fort Myers, FL",
    hours: "9am - 8pm",
    description: "100% organic cafe with fresh juices, smoothies, and prepared meals. Vegan and vegetarian friendly.",
    priceLevel: 2,
  },
  {
    id: "5",
    name: "Chicken Salad Chick",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    distance: "3.5 mi",
    rating: 4.4,
    studentDiscount: "Free cookie with meal",
    address: "13220 S Cleveland Ave, Fort Myers, FL",
    hours: "10:30am - 8pm",
    description: "Lighter lunch options with fresh chicken salads and low-carb plates. Great for quick healthy meals.",
    priceLevel: 1,
  },
  {
    id: "6",
    name: "SoVi Dining Hall",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
    distance: "0.1 mi",
    rating: 4.3,
    studentDiscount: "Meal plan accepted",
    address: "FGCU Campus, Fort Myers, FL",
    hours: "7am - 9pm",
    description: "On-campus dining with nutritional info online. Fresh salad bar, grilled options, and smoothie station.",
    priceLevel: 1,
  },
  {
    id: "7",
    name: "FGCU Recreation Center",
    category: "gym",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    distance: "0.1 mi",
    rating: 4.9,
    studentDiscount: "Free for students",
    address: "10501 FGCU Blvd S, Fort Myers, FL",
    hours: "6am - 11pm",
    description: "State-of-the-art fitness facility with pools, basketball courts, rock wall, and group fitness classes.",
    priceLevel: 0,
  },
  {
    id: "8",
    name: "Planet Fitness",
    category: "gym",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    distance: "3.2 mi",
    rating: 4.5,
    studentDiscount: "$10/month basic membership",
    address: "4125 Cleveland Ave, Fort Myers, FL",
    hours: "24/7",
    description: "Judgement-free zone with cardio equipment, strength training, and free fitness training.",
    priceLevel: 1,
  },
  {
    id: "9",
    name: "Orangetheory Fitness",
    category: "gym",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
    distance: "4.8 mi",
    rating: 4.7,
    studentDiscount: "First class free",
    address: "13411 Summerlin Rd, Fort Myers, FL",
    hours: "5am - 8pm",
    description: "Heart-rate based interval training with science-backed workouts. Great for building endurance.",
    priceLevel: 3,
  },
  {
    id: "10",
    name: "Publix Super Market",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    distance: "1.8 mi",
    rating: 4.6,
    address: "10045 University Plaza Dr, Fort Myers, FL",
    hours: "7am - 10pm",
    description: "Full-service grocery with GreenWise organic section, fresh deli, and pharmacy. Near FGCU campus.",
    priceLevel: 2,
  },
  {
    id: "11",
    name: "Trader Joe's",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    distance: "5.5 mi",
    rating: 4.8,
    address: "14764 S Tamiami Trail, Fort Myers, FL",
    hours: "8am - 9pm",
    description: "Affordable healthy options with unique organic products and ready-to-eat meals.",
    priceLevel: 2,
  },
  {
    id: "12",
    name: "Whole Foods Market",
    category: "grocery",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400",
    distance: "7.2 mi",
    rating: 4.6,
    studentDiscount: "Extra 10% off sale items with Prime",
    address: "13880 S Tamiami Trail, Fort Myers, FL",
    hours: "8am - 10pm",
    description: "Premium organic groceries with hot bar, salad bar, and fresh juice station.",
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
