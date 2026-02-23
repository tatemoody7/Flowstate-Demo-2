import { Coordinates } from "@/utils/distance";

export interface PlaceLocation {
  address: string;
  coords: Coordinates;
}

export interface Place {
  id: string;
  name: string;
  category: "restaurant" | "gym" | "grocery";
  image: string;
  rating: number;
  reviewCount: number;
  studentDiscount?: string;
  hours: string;
  description: string;
  priceLevel: number;
  phone?: string;
  website?: string;
  logo?: any;
  locations: PlaceLocation[];
}

export interface FlaggedIngredient {
  name: string;
  flag: "good" | "bad" | "neutral" | "caution";
  reason?: string;
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
  ingredients?: FlaggedIngredient[];
  ingredientsRaw?: string;
  allergens?: string;
  additives?: string[];
  nutritionGrade?: string;
  barcode?: string;
  servingSize?: string;
}

// ─── RESTAURANTS ───────────────────────────────────────────────────────────────

export const mockPlaces: Place[] = [
  {
    id: "r1",
    name: "Crisp & Green",
    category: "restaurant",
    logo: require("../../assets/logos/crisp-green.png"),
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    rating: 4.6,
    reviewCount: 134,
    hours: "10:30am - 9pm",
    description: "Fast-casual restaurant serving scratch-made salads, grain bowls, and smoothies with clean, whole ingredients.",
    priceLevel: 2,
    website: "https://crispandgreen.com",
    locations: [
      {
        address: "10171 Estero Town Commons Pl Unit 306, Estero, FL 33928",
        coords: { latitude: 26.4338, longitude: -81.8068 },
      },
    ],
  },
  {
    id: "r2",
    name: "Poke Fusion",
    category: "restaurant",
    logo: require("../../assets/logos/poke-fusion.png"),
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    rating: 4.5,
    reviewCount: 87,
    hours: "11am - 9pm",
    description: "Fresh poke bowls with customizable proteins and toppings. Build-your-own bowls with ahi tuna, salmon, and more.",
    priceLevel: 2,
    locations: [
      {
        address: "19901 Ben Hill Griffin Pkwy, Three Oaks, FL 33913",
        coords: { latitude: 26.4540, longitude: -81.7480 },
      },
    ],
  },
  {
    id: "r3",
    name: "Chipotle",
    category: "restaurant",
    logo: require("../../assets/logos/chipotle.png"),
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400",
    rating: 4.5,
    reviewCount: 195,
    studentDiscount: "Free chips & guac with entree",
    hours: "10:45am - 11pm",
    description: "Build your own burritos, bowls, and salads with fresh ingredients. High-protein options with chicken, steak, or sofritas.",
    priceLevel: 2,
    website: "https://chipotle.com",
    locations: [
      {
        address: "10010 University Plaza Dr Ste 102, Fort Myers, FL 33913",
        coords: { latitude: 26.4378, longitude: -81.7725 },
      },
      {
        address: "22941 Lyden Dr, Estero, FL 33928",
        coords: { latitude: 26.4280, longitude: -81.7950 },
      },
    ],
  },
  {
    id: "r4",
    name: "CAVA",
    category: "restaurant",
    logo: require("../../assets/logos/cava.png"),
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400",
    rating: 4.7,
    reviewCount: 170,
    studentDiscount: "10% off with student ID",
    hours: "10:45am - 10pm",
    description: "Customizable Mediterranean grain bowls, salads, and pitas with fresh greens and grilled proteins. Gluten-free and vegetarian options.",
    priceLevel: 2,
    website: "https://cava.com",
    locations: [
      {
        address: "16441 Corporate Commerce Way Unit 100, Fort Myers, FL 33913",
        coords: { latitude: 26.4925, longitude: -81.7558 },
      },
    ],
  },
  {
    id: "r5",
    name: "Tacos on the Road",
    category: "restaurant",
    logo: require("../../assets/logos/tacos-on-the-road.png"),
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    rating: 4.6,
    reviewCount: 112,
    hours: "11am - 9pm",
    description: "Authentic street-style tacos with fresh ingredients. Grilled meats, homemade salsas, and traditional Mexican flavors.",
    priceLevel: 1,
    locations: [
      {
        address: "10351 Corkscrew Rd, Estero, FL 33928",
        coords: { latitude: 26.4380, longitude: -81.7380 },
      },
    ],
  },
  {
    id: "r6",
    name: "Smoothie King",
    category: "restaurant",
    logo: require("../../assets/logos/smoothie-king.png"),
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
    rating: 4.4,
    reviewCount: 185,
    studentDiscount: "$2 off any 32oz smoothie",
    hours: "Mon-Fri 7am-9pm, Sat 8am-9pm, Sun 10am-8pm",
    description: "Purpose-blended smoothies for fitness, slim, or wellness goals. Protein add-ons and healthy bowls available.",
    priceLevel: 1,
    phone: "(239) 789-4600",
    website: "https://smoothieking.com",
    locations: [
      {
        address: "19810 Village Center Dr Unit 160A, Fort Myers, FL 33913",
        coords: { latitude: 26.4558, longitude: -81.7515 },
      },
    ],
  },
  {
    id: "r7",
    name: "Bahia Bowls",
    category: "restaurant",
    logo: require("../../assets/logos/bahia-bowls.png"),
    image: "https://images.unsplash.com/photo-1611928482473-7b27d24eab80?w=400",
    rating: 4.6,
    reviewCount: 148,
    hours: "8am - 8pm",
    description: "Acai bowls, pitaya bowls, oatmeal bowls, and fresh smoothies. Perfect for a quick healthy breakfast or post-workout fuel.",
    priceLevel: 2,
    website: "https://bahiabowls.com",
    locations: [
      {
        address: "20321 Grande Oak Shoppes Blvd Unit 306, Estero, FL 33928",
        coords: { latitude: 26.4385, longitude: -81.8095 },
      },
    ],
  },
  {
    id: "r8",
    name: "Yummy Yummy Asian Kitchen",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400",
    rating: 4.4,
    reviewCount: 96,
    hours: "11am - 9:30pm",
    description: "Asian fusion cuisine with fresh stir-fries, noodle dishes, sushi, and customizable rice bowls. Plenty of vegetable-forward options.",
    priceLevel: 1,
    locations: [
      {
        address: "21301 S Tamiami Trail Ste 380, Estero, FL 33928",
        coords: { latitude: 26.4310, longitude: -81.8060 },
      },
    ],
  },
  {
    id: "r9",
    name: "Mellow Mushroom",
    category: "restaurant",
    logo: require("../../assets/logos/mellow-mushroom.png"),
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    rating: 4.5,
    reviewCount: 210,
    hours: "11am - 10pm",
    description: "Stone-baked pizzas, hoagies, and salads with creative toppings. Gluten-free crust and vegan cheese options available.",
    priceLevel: 2,
    website: "https://mellowmushroom.com",
    locations: [
      {
        address: "10950 Eagle Village Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4340, longitude: -81.7560 },
      },
    ],
  },
  {
    id: "r10",
    name: "Juice Society",
    category: "restaurant",
    logo: require("../../assets/logos/juice-society.png"),
    image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400",
    rating: 4.8,
    reviewCount: 97,
    hours: "Mon-Fri 9am-5pm, Sat 9am-5pm, Sun 10am-5pm",
    description: "Cold-pressed organic juices, acai bowls, pitaya bowls, and smoothies made with locally sourced organic products.",
    priceLevel: 2,
    phone: "(239) 301-4456",
    website: "https://juicesocietyjuicery.com",
    locations: [
      {
        address: "23106 Fashion Dr, Estero, FL 33928",
        coords: { latitude: 26.4185, longitude: -81.8030 },
      },
    ],
  },
  {
    id: "r11",
    name: "Sour & Dough Artisan Bakery",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
    rating: 4.7,
    reviewCount: 76,
    hours: "7am - 3pm",
    description: "Artisan sourdough breads, pastries, sandwiches, and breakfast items made from scratch daily with quality ingredients.",
    priceLevel: 2,
    locations: [
      {
        address: "19800 Village Center Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4555, longitude: -81.7510 },
      },
    ],
  },
  {
    id: "r12",
    name: "Tropical Smoothie Cafe",
    category: "restaurant",
    logo: require("../../assets/logos/tropical-smoothie.png"),
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
    rating: 4.3,
    reviewCount: 145,
    hours: "7am - 10pm",
    description: "Smoothies, wraps, sandwiches, and Tropic Bowls including acai and chia oatmeal options. Fresh and fast.",
    priceLevel: 1,
    website: "https://tropicalsmoothiecafe.com",
    locations: [
      {
        address: "10011 Estero Town Commons Pl, Estero, FL 33928",
        coords: { latitude: 26.4335, longitude: -81.8065 },
      },
    ],
  },
  {
    id: "r13",
    name: "Bubbakoo's Burritos",
    category: "restaurant",
    logo: require("../../assets/logos/bubbakoos.png"),
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
    rating: 4.3,
    reviewCount: 68,
    hours: "11am - 10pm",
    description: "Mexican fusion burritos, bowls, tacos, quesadillas, and nachos. Customizable with fresh ingredients and bold flavors.",
    priceLevel: 1,
    website: "https://bubbakoos.com",
    locations: [
      {
        address: "10151 Estero Town Commons Pl Unit 205, Estero, FL 33928",
        coords: { latitude: 26.4336, longitude: -81.8062 },
      },
    ],
  },
  {
    id: "r14",
    name: "Chicken Salad Chick",
    category: "restaurant",
    logo: require("../../assets/logos/chicken-salad-chick.png"),
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    rating: 4.4,
    reviewCount: 89,
    studentDiscount: "Free cookie with meal",
    hours: "10:30am - 8pm",
    description: "Lighter lunch options with a dozen varieties of fresh chicken salads and low-carb plates. Great for quick healthy meals.",
    priceLevel: 1,
    website: "https://chickensaladchick.com",
    locations: [
      {
        address: "10151 Estero Town Commons Pl Unit 201, Estero, FL 33928",
        coords: { latitude: 26.4336, longitude: -81.8062 },
      },
    ],
  },
  {
    id: "r15",
    name: "Clase Azul",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
    rating: 4.7,
    reviewCount: 53,
    hours: "5pm - 10pm",
    description: "Upscale Mexican dining experience with premium tequila, craft cocktails, and elevated traditional dishes.",
    priceLevel: 3,
    locations: [
      {
        address: "9908 Gulf Coast Main St Unit 125, Fort Myers, FL 33913",
        coords: { latitude: 26.4375, longitude: -81.7690 },
      },
    ],
  },
  {
    id: "r16",
    name: "Oak and Stone",
    category: "restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    rating: 4.5,
    reviewCount: 165,
    hours: "11am - 11pm",
    description: "Craft beer gastropub with wood-fired pizzas, creative burgers, shareable plates, and a wide selection of local brews.",
    priceLevel: 2,
    locations: [
      {
        address: "10191 Estero Town Commons Pl, Estero, FL 33928",
        coords: { latitude: 26.4337, longitude: -81.8060 },
      },
    ],
  },
  {
    id: "r17",
    name: "Panera Bread",
    category: "restaurant",
    logo: require("../../assets/logos/panera.png"),
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400",
    rating: 4.3,
    reviewCount: 230,
    hours: "6am - 9pm",
    description: "Fresh sandwiches, salads, soups, and grain bowls. Clean ingredients with calorie-conscious menu options.",
    priceLevel: 2,
    website: "https://panerabread.com",
    locations: [
      {
        address: "9970 University Plaza Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4380, longitude: -81.7730 },
      },
    ],
  },

  // ─── GYMS & FITNESS ─────────────────────────────────────────────────────────

  {
    id: "g1",
    name: "FGCU Rec Center",
    category: "gym",
    logo: require("../../assets/logos/fgcu.png"),
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    rating: 4.9,
    reviewCount: 261,
    studentDiscount: "Free for FGCU students",
    hours: "6am - 11pm",
    description: "State-of-the-art on-campus fitness facility with pools, basketball courts, rock wall, group fitness classes, and personal training.",
    priceLevel: 0,
    phone: "(239) 590-1810",
    website: "https://fgcu.edu/recwell",
    locations: [
      {
        address: "10501 FGCU Blvd S, Fort Myers, FL 33965",
        coords: { latitude: 26.4625, longitude: -81.7718 },
      },
    ],
  },
  {
    id: "g2",
    name: "LA Fitness",
    category: "gym",
    logo: require("../../assets/logos/la-fitness.png"),
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    rating: 4.3,
    reviewCount: 142,
    studentDiscount: "Discounted student membership",
    hours: "Mon-Thu 5am-10pm, Fri 5am-9pm, Sat-Sun 8am-5pm",
    description: "Full-service gym with cardio, strength equipment, swimming pools, basketball courts, racquetball, and group fitness classes.",
    priceLevel: 2,
    website: "https://lafitness.com",
    locations: [
      {
        address: "10058 Gulf Center Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4365, longitude: -81.7710 },
      },
    ],
  },
  {
    id: "g3",
    name: "Amped Fitness",
    category: "gym",
    logo: require("../../assets/logos/amped-fitness.png"),
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400",
    rating: 4.6,
    reviewCount: 178,
    hours: "24/7",
    description: "High-energy 24-hour gym with extensive free weights, machines, cardio equipment, and a motivating atmosphere for serious lifters.",
    priceLevel: 2,
    website: "https://ampedfitness.com",
    locations: [
      {
        address: "16970 Alico Mission Way, Fort Myers, FL 33908",
        coords: { latitude: 26.4920, longitude: -81.7555 },
      },
    ],
  },
  {
    id: "g4",
    name: "HOTWORX",
    category: "gym",
    logo: require("../../assets/logos/hotworx.png"),
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    rating: 4.5,
    reviewCount: 259,
    studentDiscount: "First session free",
    hours: "24/7",
    description: "24-hour infrared fitness studio with hot yoga, pilates, barre, cycling, and HIIT in virtually instructed sessions.",
    priceLevel: 2,
    website: "https://hotworx.net",
    locations: [
      {
        address: "10950 Eagle Village Dr Ste 310C, Fort Myers, FL 33913",
        coords: { latitude: 26.4340, longitude: -81.7565 },
      },
    ],
  },
  {
    id: "g5",
    name: "SoulBody Studios",
    category: "gym",
    logo: require("../../assets/logos/soulbody.png"),
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
    rating: 4.8,
    reviewCount: 126,
    studentDiscount: "Student drop-in rate",
    hours: "Mon-Sat 6am-7pm, Sun 8am-2pm",
    description: "Pilates (mat & reformer), yoga, barre, and recovery modalities including infrared sauna, red light therapy, and compression.",
    priceLevel: 3,
    website: "https://soulbodystudios.com",
    locations: [
      {
        address: "9918 Gulf Coast Main St, Fort Myers, FL 33913",
        coords: { latitude: 26.4378, longitude: -81.7685 },
      },
    ],
  },
  {
    id: "g6",
    name: "BODYBAR Pilates",
    category: "gym",
    logo: require("../../assets/logos/bodybar-pilates.png"),
    image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?w=400",
    rating: 4.6,
    reviewCount: 92,
    studentDiscount: "Free intro class",
    hours: "Mon-Fri 6am-8pm, Sat-Sun 8am-12pm",
    description: "Reformer pilates studio with energizing classes set to great music. Full-body sculpting workouts for all fitness levels.",
    priceLevel: 3,
    website: "https://bodybarpilates.com",
    locations: [
      {
        address: "10021 Estero Town Commons Pl Unit 102, Estero, FL 33928",
        coords: { latitude: 26.4335, longitude: -81.8060 },
      },
    ],
  },
  {
    id: "g7",
    name: "Club Pilates",
    category: "gym",
    logo: require("../../assets/logos/club-pilates.png"),
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
    rating: 4.5,
    reviewCount: 261,
    studentDiscount: "Free intro class",
    hours: "Mon-Fri 6am-8pm, Sat-Sun 7am-1pm",
    description: "Reformer pilates studio with classes for all levels. TRX, springboard, and EXO chair equipment available.",
    priceLevel: 3,
    website: "https://clubpilates.com",
    locations: [
      {
        address: "20321 Grande Oak Shoppes Blvd, Estero, FL 33928",
        coords: { latitude: 26.4385, longitude: -81.8095 },
      },
    ],
  },
  {
    id: "g8",
    name: "IMX Pilates and Fitness",
    category: "gym",
    logo: require("../../assets/logos/imx-pilates.png"),
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    rating: 4.7,
    reviewCount: 68,
    hours: "Mon-Fri 6am-8pm, Sat 8am-12pm",
    description: "Integrated Movement Xercize combining pilates reformer with functional training. Small group classes and private sessions.",
    priceLevel: 3,
    website: "https://imxpilates.com",
    locations: [
      {
        address: "10952 Eagle Village Dr Ste 410, Fort Myers, FL 33913",
        coords: { latitude: 26.4342, longitude: -81.7562 },
      },
    ],
  },
  {
    id: "g9",
    name: "Sweet Science Boxing & Fitness",
    category: "gym",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400",
    rating: 4.6,
    reviewCount: 84,
    hours: "Mon-Fri 6am-8pm, Sat 8am-1pm",
    description: "Boxing-focused fitness classes with bag work, pad drills, and conditioning. Great for stress relief and full-body workouts.",
    priceLevel: 2,
    locations: [
      {
        address: "19451 S Tamiami Trail, Fort Myers, FL 33908",
        coords: { latitude: 26.4720, longitude: -81.7780 },
      },
    ],
  },
  {
    id: "g10",
    name: "Untouchable Fitness",
    category: "gym",
    image: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=400",
    rating: 4.5,
    reviewCount: 56,
    hours: "Mon-Sat 5am-9pm, Sun 7am-3pm",
    description: "Personal training and group fitness classes with a community-driven atmosphere. Strength, conditioning, and accountability coaching.",
    priceLevel: 2,
    locations: [
      {
        address: "20041 S Tamiami Trail, Estero, FL 33928",
        coords: { latitude: 26.4480, longitude: -81.7930 },
      },
    ],
  },
  {
    id: "g11",
    name: "Planet Fitness",
    category: "gym",
    logo: require("../../assets/logos/planet-fitness.png"),
    image: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=400",
    rating: 4.4,
    reviewCount: 198,
    studentDiscount: "$10/month basic membership",
    hours: "24/7",
    description: "Judgement-free zone with cardio equipment, strength training machines, and free fitness training sessions included.",
    priceLevel: 1,
    website: "https://planetfitness.com",
    locations: [
      {
        address: "18011 S Tamiami Trail, Fort Myers, FL 33908",
        coords: { latitude: 26.4820, longitude: -81.7700 },
      },
    ],
  },

  // ─── GROCERY STORES ─────────────────────────────────────────────────────────

  {
    id: "gr1",
    name: "Publix",
    category: "grocery",
    logo: require("../../assets/logos/publix.png"),
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400",
    rating: 4.6,
    reviewCount: 234,
    hours: "7am - 10pm",
    description: "Full-service grocery with GreenWise organic section, fresh deli, bakery, and pharmacy. A staple for FGCU students.",
    priceLevel: 2,
    website: "https://publix.com",
    locations: [
      {
        address: "20311 Grande Oak Shoppes Blvd, Estero, FL 33928",
        coords: { latitude: 26.4383, longitude: -81.8090 },
      },
      {
        address: "21301 S Tamiami Trail Ste 200, Estero, FL 33928",
        coords: { latitude: 26.4310, longitude: -81.8060 },
      },
      {
        address: "16980 Alico Mission Way Unit 403, Fort Myers, FL 33908",
        coords: { latitude: 26.4918, longitude: -81.7550 },
      },
      {
        address: "24600 S Tamiami Trail Unit 300, Bonita Springs, FL 34134",
        coords: { latitude: 26.3920, longitude: -81.8230 },
      },
    ],
  },
  {
    id: "gr2",
    name: "Walmart",
    category: "grocery",
    logo: require("../../assets/logos/walmart.png"),
    image: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400",
    rating: 4.1,
    reviewCount: 312,
    hours: "6am - 11pm",
    description: "One-stop shop with full grocery, fresh produce, bakery, deli, and everyday essentials at low prices.",
    priceLevel: 1,
    website: "https://walmart.com",
    locations: [
      {
        address: "19975 S Tamiami Trail, Estero, FL 33928",
        coords: { latitude: 26.4475, longitude: -81.7935 },
      },
    ],
  },
  {
    id: "gr3",
    name: "Target",
    category: "grocery",
    logo: require("../../assets/logos/target.png"),
    image: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400",
    rating: 4.4,
    reviewCount: 189,
    hours: "7am - 10pm",
    description: "Full grocery section with Good & Gather brand, organic options, fresh produce, and everyday essentials.",
    priceLevel: 2,
    website: "https://target.com",
    locations: [
      {
        address: "10000 Gulf Center Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4370, longitude: -81.7700 },
      },
      {
        address: "8040 Mediterranean Dr, Estero, FL 33928",
        coords: { latitude: 26.4290, longitude: -81.7850 },
      },
    ],
  },
  {
    id: "gr4",
    name: "Sprouts Farmers Market",
    category: "grocery",
    logo: require("../../assets/logos/sprouts.png"),
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    rating: 4.6,
    reviewCount: 187,
    hours: "7am - 10pm",
    description: "Natural and organic foods with bulk bins, fresh deli, pre-made meals, sushi, and an extensive supplement section.",
    priceLevel: 2,
    website: "https://sprouts.com",
    locations: [
      {
        address: "19998 S Tamiami Trail, Estero, FL 33928",
        coords: { latitude: 26.4470, longitude: -81.7930 },
      },
    ],
  },
  {
    id: "gr5",
    name: "Costco",
    category: "grocery",
    logo: require("../../assets/logos/costco.png"),
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    rating: 4.7,
    reviewCount: 285,
    hours: "10am - 8:30pm",
    description: "Wholesale warehouse with bulk organic groceries, fresh produce, rotisserie chicken, bakery, and Kirkland Signature brand.",
    priceLevel: 1,
    website: "https://costco.com",
    locations: [
      {
        address: "10088 Gulf Center Dr, Fort Myers, FL 33913",
        coords: { latitude: 26.4368, longitude: -81.7705 },
      },
    ],
  },
  {
    id: "gr6",
    name: "ALDI",
    category: "grocery",
    logo: require("../../assets/logos/aldi.png"),
    image: "https://images.unsplash.com/photo-1604077350837-c3fb65a8fda2?w=400",
    rating: 4.3,
    reviewCount: 181,
    hours: "9am - 8pm",
    description: "Budget-friendly grocery with organic options, fresh produce, and quality store-brand products at unbeatable prices.",
    priceLevel: 1,
    website: "https://aldi.us",
    locations: [
      {
        address: "19951 S Tamiami Trail, Estero, FL 33928",
        coords: { latitude: 26.4478, longitude: -81.7932 },
      },
    ],
  },
  {
    id: "gr7",
    name: "Whole Foods Market",
    category: "grocery",
    logo: require("../../assets/logos/whole-foods.png"),
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400",
    rating: 4.6,
    reviewCount: 217,
    studentDiscount: "Extra 10% off sale items with Prime",
    hours: "8am - 9pm",
    description: "Premium organic groceries with hot bar, salad bar, fresh juice station, sushi, and pastry shop.",
    priceLevel: 3,
    phone: "(239) 432-7100",
    website: "https://wholefoodsmarket.com",
    locations: [
      {
        address: "6891 Daniels Pkwy Ste 100, Fort Myers, FL 33966",
        coords: { latitude: 26.5550, longitude: -81.8250 },
      },
    ],
  },
  {
    id: "gr8",
    name: "The Fresh Market",
    category: "grocery",
    logo: require("../../assets/logos/fresh-market.png"),
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400",
    rating: 4.5,
    reviewCount: 277,
    hours: "8am - 9pm",
    description: "Premium specialty grocery with fresh prepared foods, high-quality meats, artisan cheeses, and gourmet selections.",
    priceLevel: 3,
    website: "https://thefreshmarket.com",
    locations: [
      {
        address: "13499 S Cleveland Ave, Fort Myers, FL 33907",
        coords: { latitude: 26.5730, longitude: -81.8540 },
      },
    ],
  },
];

// ─── SCANNED FOODS ────────────────────────────────────────────────────────────

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
      { store: "Whole Foods", price: 1.79 },
      { store: "Sprouts", price: 1.39 },
      { store: "ALDI", price: 0.99 },
    ],
    ingredients: [
      { name: "Cultured Nonfat Milk", flag: "neutral" },
      { name: "Whey Protein Concentrate", flag: "good", reason: "Complete protein source" },
      { name: "Natural Flavors", flag: "neutral" },
      { name: "Fruit Pectin", flag: "neutral" },
    ],
    ingredientsRaw: "Cultured Nonfat Milk, Whey Protein Concentrate, Natural Flavors, Fruit Pectin",
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
      { store: "Whole Foods", price: 3.29 },
      { store: "Sprouts", price: 2.79 },
      { store: "Target", price: 2.69 },
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
      { store: "Whole Foods", price: 9.49 },
      { store: "Sprouts", price: 7.99 },
      { store: "Target", price: 7.49 },
    ],
  },
  {
    id: "f4",
    name: "Organic Spinach",
    brand: "Earthbound Farm",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
    healthScore: 95,
    calories: 23,
    protein: 3,
    carbs: 4,
    fat: 0,
    fiber: 2,
    sugar: 0,
    sodium: 79,
    prices: [
      { store: "Publix", price: 4.99 },
      { store: "Whole Foods", price: 5.49 },
      { store: "Sprouts", price: 3.99 },
      { store: "ALDI", price: 2.99 },
    ],
  },
  {
    id: "f5",
    name: "Frosted Flakes",
    brand: "Kellogg's",
    image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=400",
    healthScore: 35,
    calories: 130,
    protein: 1,
    carbs: 31,
    fat: 0,
    fiber: 0,
    sugar: 12,
    sodium: 190,
    prices: [
      { store: "Publix", price: 4.79 },
      { store: "Whole Foods", price: 5.29 },
      { store: "Target", price: 3.99 },
      { store: "ALDI", price: 2.49 },
    ],
    ingredients: [
      { name: "Milled Corn", flag: "neutral" },
      { name: "Sugar", flag: "neutral" },
      { name: "Malt Flavoring", flag: "neutral" },
      { name: "High Fructose Corn Syrup", flag: "bad", reason: "Added sugar linked to metabolic issues" },
      { name: "Salt", flag: "neutral" },
      { name: "BHT", flag: "bad", reason: "Synthetic preservative" },
    ],
    ingredientsRaw: "Milled Corn, Sugar, Malt Flavoring, High Fructose Corn Syrup, Salt, BHT for Freshness",
  },
  {
    id: "f6",
    name: "Energy Drink",
    brand: "Monster",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400",
    healthScore: 25,
    calories: 210,
    protein: 0,
    carbs: 54,
    fat: 0,
    fiber: 0,
    sugar: 54,
    sodium: 370,
    prices: [
      { store: "Publix", price: 2.99 },
      { store: "Whole Foods", price: 3.49 },
      { store: "Target", price: 2.79 },
      { store: "ALDI", price: 1.99 },
    ],
    ingredients: [
      { name: "Carbonated Water", flag: "neutral" },
      { name: "Sugar", flag: "neutral" },
      { name: "Glucose", flag: "neutral" },
      { name: "Citric Acid", flag: "neutral" },
      { name: "Taurine", flag: "neutral" },
      { name: "Sodium Citrate", flag: "neutral" },
      { name: "Artificial Color", flag: "bad", reason: "Synthetic dye" },
      { name: "Sodium Benzoate", flag: "bad", reason: "Preservative" },
      { name: "Sucralose", flag: "bad", reason: "Artificial sweetener" },
      { name: "Caffeine", flag: "neutral" },
    ],
    ingredientsRaw: "Carbonated Water, Sugar, Glucose, Citric Acid, Taurine, Sodium Citrate, Artificial Color, Sodium Benzoate, Sucralose, Caffeine",
  },
  {
    id: "f7",
    name: "Salmon Fillet",
    brand: "Wild Caught",
    image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400",
    healthScore: 92,
    calories: 208,
    protein: 28,
    carbs: 0,
    fat: 10,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    prices: [
      { store: "Publix", price: 9.99 },
      { store: "Whole Foods", price: 12.99 },
      { store: "Sprouts", price: 9.99 },
      { store: "Walmart", price: 7.99 },
      { store: "ALDI", price: 7.49 },
    ],
  },
];

export const categories = [
  { id: "all", label: "All", icon: "grid" as const },
  { id: "restaurant", label: "Restaurants", icon: "coffee" as const },
  { id: "gym", label: "Gyms", icon: "activity" as const },
  { id: "grocery", label: "Groceries", icon: "shopping-cart" as const },
];
