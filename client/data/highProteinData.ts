export interface HighProteinItem {
  id: string;
  name: string;
  brand?: string;
  protein: number;
  calories: number;
  servingSize: string;
  price?: number;
  category: "meat" | "dairy" | "plant" | "bar" | "seafood" | "other";
  storeExclusive: boolean;
  ingredients?: string[];
}

export interface StoreProteinList {
  storeKey: string;
  storeName: string;
  distance: string;
  color: string;
  items: HighProteinItem[];
}

export const HIGH_PROTEIN_STORES: StoreProteinList[] = [
  {
    storeKey: "publix",
    storeName: "Publix",
    distance: "3.0 mi",
    color: "#4A7C3F",
    items: [
      { id: "pub-1", name: "Chicken Breast", brand: "Publix", protein: 26, calories: 120, servingSize: "4 oz", price: 3.99, category: "meat", storeExclusive: false },
      { id: "pub-2", name: "Ground Turkey 93/7", brand: "Publix", protein: 22, calories: 170, servingSize: "4 oz", price: 4.49, category: "meat", storeExclusive: false },
      { id: "pub-3", name: "Cottage Cheese", brand: "Publix", protein: 14, calories: 110, servingSize: "1/2 cup", price: 3.99, category: "dairy", storeExclusive: false },
      { id: "pub-4", name: "Greek Yogurt", brand: "Publix", protein: 15, calories: 120, servingSize: "5.3 oz", price: 1.49, category: "dairy", storeExclusive: false },
      { id: "pub-5", name: "Quest Bar Caramel Almond", brand: "Quest", protein: 21, calories: 200, servingSize: "1 bar", price: 2.99, category: "bar", storeExclusive: false },
      { id: "pub-6", name: "Salmon Fillet", brand: "Publix", protein: 23, calories: 180, servingSize: "4 oz", price: 9.99, category: "seafood", storeExclusive: false },
      { id: "pub-7", name: "Eggs (dozen)", brand: "Publix", protein: 6, calories: 70, servingSize: "1 egg", price: 3.49, category: "other", storeExclusive: false },
      { id: "pub-8", name: "GreenWise Organic Chicken", brand: "GreenWise", protein: 26, calories: 130, servingSize: "4 oz", price: 6.99, category: "meat", storeExclusive: true },
      { id: "pub-9", name: "Deli Chicken Quesadilla", brand: "Publix Deli", protein: 33, calories: 450, servingSize: "1 quesadilla", price: 6.99, category: "other", storeExclusive: true },
      { id: "pub-10", name: "Protein Powder", brand: "Various", protein: 25, calories: 130, servingSize: "1 scoop", price: 24.99, category: "other", storeExclusive: false },
    ],
  },
  {
    storeKey: "wholeFoods",
    storeName: "Whole Foods",
    distance: "7.0 mi",
    color: "#00674B",
    items: [
      { id: "wf-1", name: "365 Chewy Protein Bites", brand: "365", protein: 15, calories: 200, servingSize: "1 pack", price: 3.49, category: "bar", storeExclusive: true },
      { id: "wf-2", name: "Organic Tempeh", brand: "365", protein: 21, calories: 200, servingSize: "4 oz", price: 3.29, category: "plant", storeExclusive: false },
      { id: "wf-3", name: "Red Lentils", brand: "365", protein: 17, calories: 180, servingSize: "1 cup cooked", price: 2.99, category: "plant", storeExclusive: false },
      { id: "wf-4", name: "Garbanzo Beans", brand: "365", protein: 17, calories: 210, servingSize: "1 cup", price: 1.49, category: "plant", storeExclusive: false },
      { id: "wf-5", name: "Nonfat Greek Yogurt", brand: "365", protein: 17, calories: 100, servingSize: "6 oz", price: 1.29, category: "dairy", storeExclusive: true },
      { id: "wf-6", name: "Wild Caught Salmon", brand: "Whole Foods", protein: 25, calories: 200, servingSize: "4 oz", price: 12.99, category: "seafood", storeExclusive: false },
      { id: "wf-7", name: "Organic Chicken Breast", brand: "365", protein: 26, calories: 120, servingSize: "4 oz", price: 6.99, category: "meat", storeExclusive: false },
      { id: "wf-8", name: "Hemp Seeds", brand: "365", protein: 10, calories: 170, servingSize: "3 tbsp", price: 8.99, category: "plant", storeExclusive: false },
      { id: "wf-9", name: "Edamame", brand: "365", protein: 17, calories: 190, servingSize: "1 cup", price: 2.99, category: "plant", storeExclusive: false },
      { id: "wf-10", name: "Siggi's Skyr Yogurt", brand: "Siggi's", protein: 17, calories: 110, servingSize: "5.3 oz", price: 2.29, category: "dairy", storeExclusive: false },
    ],
  },
  {
    storeKey: "target",
    storeName: "Target",
    distance: "3.0 mi",
    color: "#CC0000",
    items: [
      { id: "tar-1", name: "Barebells Protein Bar", brand: "Barebells", protein: 20, calories: 210, servingSize: "1 bar", price: 2.99, category: "bar", storeExclusive: false },
      { id: "tar-2", name: "Pure Protein Bar", brand: "Pure Protein", protein: 21, calories: 200, servingSize: "1 bar", price: 1.79, category: "bar", storeExclusive: false },
      { id: "tar-3", name: "IQBAR Brain + Body", brand: "IQBAR", protein: 12, calories: 160, servingSize: "1 bar", price: 2.49, category: "bar", storeExclusive: false },
      { id: "tar-4", name: "Good & Gather Chicken", brand: "Good & Gather", protein: 26, calories: 120, servingSize: "4 oz", price: 4.49, category: "meat", storeExclusive: true },
      { id: "tar-5", name: "Greek Yogurt", brand: "Good & Gather", protein: 15, calories: 120, servingSize: "5.3 oz", price: 1.19, category: "dairy", storeExclusive: true },
      { id: "tar-6", name: "Fairlife Protein Shake", brand: "Fairlife", protein: 30, calories: 150, servingSize: "11.5 fl oz", price: 3.29, category: "dairy", storeExclusive: false },
      { id: "tar-7", name: "Ground Turkey 93/7", brand: "Good & Gather", protein: 22, calories: 170, servingSize: "4 oz", price: 4.99, category: "meat", storeExclusive: true },
      { id: "tar-8", name: "Cottage Cheese", brand: "Good & Gather", protein: 14, calories: 110, servingSize: "1/2 cup", price: 3.49, category: "dairy", storeExclusive: true },
      { id: "tar-9", name: "String Cheese", brand: "Good & Gather", protein: 7, calories: 80, servingSize: "1 stick", price: 4.29, category: "dairy", storeExclusive: true },
      { id: "tar-10", name: "Salmon Fillet", brand: "Good & Gather", protein: 23, calories: 180, servingSize: "4 oz", price: 8.99, category: "seafood", storeExclusive: true },
    ],
  },
  {
    storeKey: "walmart",
    storeName: "Walmart",
    distance: "5.0 mi",
    color: "#0071CE",
    items: [
      { id: "wal-1", name: "Chicken Breast", brand: "Great Value", protein: 26, calories: 120, servingSize: "4 oz", price: 3.29, category: "meat", storeExclusive: false },
      { id: "wal-2", name: "Eggs (dozen)", brand: "Great Value", protein: 6, calories: 70, servingSize: "1 egg", price: 2.98, category: "other", storeExclusive: false },
      { id: "wal-3", name: "Greek Yogurt", brand: "Great Value", protein: 15, calories: 120, servingSize: "5.3 oz", price: 0.88, category: "dairy", storeExclusive: true },
      { id: "wal-4", name: "CLIF Builders Bar", brand: "CLIF", protein: 21, calories: 280, servingSize: "1 bar", price: 1.68, category: "bar", storeExclusive: false },
      { id: "wal-5", name: "Pure Protein Bar", brand: "Pure Protein", protein: 21, calories: 200, servingSize: "1 bar", price: 1.48, category: "bar", storeExclusive: false },
      { id: "wal-6", name: "Banza Chickpea Pasta", brand: "Banza", protein: 14, calories: 190, servingSize: "2 oz dry", price: 3.48, category: "plant", storeExclusive: false },
      { id: "wal-7", name: "Ground Turkey 93/7", brand: "Great Value", protein: 22, calories: 170, servingSize: "4 oz", price: 3.79, category: "meat", storeExclusive: true },
      { id: "wal-8", name: "Canned Tuna", brand: "Great Value", protein: 16, calories: 70, servingSize: "2 oz drained", price: 1.28, category: "seafood", storeExclusive: true },
      { id: "wal-9", name: "Cottage Cheese", brand: "Great Value", protein: 14, calories: 110, servingSize: "1/2 cup", price: 2.98, category: "dairy", storeExclusive: true },
      { id: "wal-10", name: "Collagen Peptides", brand: "Vital Proteins", protein: 18, calories: 70, servingSize: "2 scoops", price: 13.47, category: "other", storeExclusive: false },
    ],
  },
  {
    storeKey: "traderJoes",
    storeName: "Trader Joe's",
    distance: "10.0 mi",
    color: "#C4122F",
    items: [
      { id: "tj-1", name: "High Protein Organic Tofu", brand: "Trader Joe's", protein: 14, calories: 90, servingSize: "3 oz", price: 2.49, category: "plant", storeExclusive: true },
      { id: "tj-2", name: "Shawarma Chicken Thighs", brand: "Trader Joe's", protein: 21, calories: 160, servingSize: "3 oz", price: 4.99, category: "meat", storeExclusive: true },
      { id: "tj-3", name: "Red Lentil Sedanini", brand: "Trader Joe's", protein: 15, calories: 200, servingSize: "3/4 cup dry", price: 2.99, category: "plant", storeExclusive: true },
      { id: "tj-4", name: "Chomps Turkey Sticks", brand: "Chomps", protein: 12, calories: 80, servingSize: "1 stick", price: 2.49, category: "meat", storeExclusive: false },
      { id: "tj-5", name: "Egg Frittata", brand: "Trader Joe's", protein: 25, calories: 280, servingSize: "1 frittata", price: 3.99, category: "other", storeExclusive: true },
      { id: "tj-6", name: "Plain Greek Nonfat Yogurt", brand: "Trader Joe's", protein: 17, calories: 100, servingSize: "6 oz", price: 0.99, category: "dairy", storeExclusive: true },
      { id: "tj-7", name: "BBQ Teriyaki Chicken", brand: "Trader Joe's", protein: 31, calories: 240, servingSize: "5 oz", price: 4.99, category: "meat", storeExclusive: true },
      { id: "tj-8", name: "Chicken Sausage Patties", brand: "Trader Joe's", protein: 13, calories: 140, servingSize: "2 patties", price: 3.49, category: "meat", storeExclusive: true },
      { id: "tj-9", name: "Spicy Jalapeño Chicken Sausage", brand: "Trader Joe's", protein: 15, calories: 140, servingSize: "1 sausage", price: 3.99, category: "meat", storeExclusive: true },
      { id: "tj-10", name: "Protein Peanut Butter Granola", brand: "Trader Joe's", protein: 11, calories: 240, servingSize: "2/3 cup", price: 3.99, category: "other", storeExclusive: true },
    ],
  },
  {
    storeKey: "sprouts",
    storeName: "Sprouts",
    distance: "8.0 mi",
    color: "#5B8C3E",
    items: [
      { id: "spr-1", name: "Siggi's Plain Greek Yogurt", brand: "Siggi's", protein: 16, calories: 90, servingSize: "5.3 oz", price: 2.29, category: "dairy", storeExclusive: false },
      { id: "spr-2", name: "Chunk White Albacore Tuna", brand: "Sprouts", protein: 29, calories: 120, servingSize: "1 can", price: 3.49, category: "seafood", storeExclusive: true },
      { id: "spr-3", name: "Turkey Breast Sliced", brand: "Sprouts", protein: 18, calories: 60, servingSize: "2 oz", price: 5.99, category: "meat", storeExclusive: true },
      { id: "spr-4", name: "Organic Chicken Breast", brand: "Sprouts", protein: 26, calories: 120, servingSize: "4 oz", price: 4.99, category: "meat", storeExclusive: false },
      { id: "spr-5", name: "Plant Protein Powder", brand: "Sprouts", protein: 21, calories: 130, servingSize: "1 scoop", price: 19.99, category: "other", storeExclusive: true },
      { id: "spr-6", name: "Turkey Sausage Links", brand: "Jones Dairy Farm", protein: 10, calories: 80, servingSize: "1 link", price: 4.99, category: "meat", storeExclusive: false },
      { id: "spr-7", name: "Wellness Bowl", brand: "Sprouts Deli", protein: 22, calories: 350, servingSize: "1 bowl", price: 8.99, category: "other", storeExclusive: true },
      { id: "spr-8", name: "Cottage Cheese", brand: "Sprouts", protein: 14, calories: 110, servingSize: "1/2 cup", price: 3.79, category: "dairy", storeExclusive: false },
      { id: "spr-9", name: "Wild Salmon Fillet", brand: "Sprouts", protein: 23, calories: 180, servingSize: "4 oz", price: 9.99, category: "seafood", storeExclusive: false },
      { id: "spr-10", name: "RXBAR Protein Bar", brand: "RXBAR", protein: 12, calories: 210, servingSize: "1 bar", price: 2.79, category: "bar", storeExclusive: false },
    ],
  },
  {
    storeKey: "aldi",
    storeName: "ALDI",
    distance: "4.0 mi",
    color: "#00528A",
    items: [
      { id: "ald-1", name: "Elevation Protein Bar", brand: "Elevation", protein: 20, calories: 210, servingSize: "1 bar", price: 0.99, category: "bar", storeExclusive: true },
      { id: "ald-2", name: "Organic Chicken Breast", brand: "Simply Nature", protein: 25, calories: 120, servingSize: "4 oz", price: 5.79, category: "meat", storeExclusive: true },
      { id: "ald-3", name: "Grass-Fed Ground Beef 85/15", brand: "Simply Nature", protein: 21, calories: 240, servingSize: "4 oz", price: 5.99, category: "meat", storeExclusive: true },
      { id: "ald-4", name: "Grass-Fed Ground Beef 93/7", brand: "Simply Nature", protein: 23, calories: 170, servingSize: "4 oz", price: 6.49, category: "meat", storeExclusive: true },
      { id: "ald-5", name: "Protein Wraps", brand: "L'oven Fresh", protein: 12, calories: 100, servingSize: "1 wrap", price: 3.49, category: "other", storeExclusive: true },
      { id: "ald-6", name: "Elevation Protein Puffs", brand: "Elevation", protein: 10, calories: 130, servingSize: "1 oz", price: 2.99, category: "bar", storeExclusive: true },
      { id: "ald-7", name: "Greek Yogurt", brand: "Friendly Farms", protein: 15, calories: 120, servingSize: "5.3 oz", price: 0.75, category: "dairy", storeExclusive: true },
      { id: "ald-8", name: "Eggs (dozen)", brand: "Goldhen", protein: 6, calories: 70, servingSize: "1 egg", price: 2.49, category: "other", storeExclusive: true },
      { id: "ald-9", name: "Cottage Cheese", brand: "Friendly Farms", protein: 14, calories: 110, servingSize: "1/2 cup", price: 2.49, category: "dairy", storeExclusive: true },
      { id: "ald-10", name: "Ultra-Filtered Protein Shake", brand: "Elevation", protein: 30, calories: 160, servingSize: "11 fl oz", price: 2.49, category: "dairy", storeExclusive: true },
    ],
  },
  {
    storeKey: "freshMarket",
    storeName: "The Fresh Market",
    distance: "9.0 mi",
    color: "#8B0000",
    items: [
      { id: "fm-1", name: "Parmesan Crusted Chicken Cutlets", brand: "The Fresh Market", protein: 28, calories: 250, servingSize: "5 oz", price: 8.99, category: "meat", storeExclusive: true },
      { id: "fm-2", name: "Rosemary Garlic Chicken Cutlets", brand: "The Fresh Market", protein: 26, calories: 220, servingSize: "5 oz", price: 8.99, category: "meat", storeExclusive: true },
      { id: "fm-3", name: "Salmon Burgers", brand: "The Fresh Market", protein: 20, calories: 170, servingSize: "1 burger", price: 6.99, category: "seafood", storeExclusive: true },
      { id: "fm-4", name: "Alaskan Salmon Fillet", brand: "The Fresh Market", protein: 25, calories: 200, servingSize: "4 oz", price: 11.99, category: "seafood", storeExclusive: false },
      { id: "fm-5", name: "Antibiotic-Free Turkey", brand: "The Fresh Market", protein: 26, calories: 120, servingSize: "4 oz", price: 5.99, category: "meat", storeExclusive: true },
      { id: "fm-6", name: "Wild-Caught Tuna Steak", brand: "The Fresh Market", protein: 30, calories: 150, servingSize: "4 oz", price: 13.99, category: "seafood", storeExclusive: false },
      { id: "fm-7", name: "Hand-Cut Filet Mignon", brand: "The Fresh Market", protein: 26, calories: 230, servingSize: "4 oz", price: 19.99, category: "meat", storeExclusive: true },
      { id: "fm-8", name: "Crab Cakes", brand: "The Fresh Market", protein: 15, calories: 180, servingSize: "1 cake", price: 9.99, category: "seafood", storeExclusive: true },
      { id: "fm-9", name: "Greek Yogurt", brand: "Various Premium", protein: 17, calories: 120, servingSize: "6 oz", price: 2.49, category: "dairy", storeExclusive: false },
      { id: "fm-10", name: "Premium Beef Jerky", brand: "The Fresh Market", protein: 13, calories: 80, servingSize: "1 oz", price: 7.99, category: "meat", storeExclusive: true },
    ],
  },
  {
    storeKey: "costco",
    storeName: "Costco",
    distance: "12.0 mi",
    color: "#E31837",
    items: [
      { id: "cos-1", name: "Kirkland Whey Protein", brand: "Kirkland Signature", protein: 25, calories: 130, servingSize: "1 scoop", price: 29.99, category: "other", storeExclusive: true },
      { id: "cos-2", name: "Kirkland Protein Bar (20ct)", brand: "Kirkland Signature", protein: 21, calories: 190, servingSize: "1 bar", price: 17.99, category: "bar", storeExclusive: true },
      { id: "cos-3", name: "Kirkland Beef Sticks (12ct)", brand: "Kirkland Signature", protein: 10, calories: 100, servingSize: "1 stick", price: 13.99, category: "meat", storeExclusive: true },
      { id: "cos-4", name: "Kirkland Hard-Boiled Eggs", brand: "Kirkland Signature", protein: 13, calories: 140, servingSize: "2 eggs", price: 8.99, category: "other", storeExclusive: true },
      { id: "cos-5", name: "Rotisserie Chicken", brand: "Kirkland Signature", protein: 32, calories: 190, servingSize: "3 oz", price: 4.99, category: "meat", storeExclusive: true },
      { id: "cos-6", name: "Organic Quinoa (4.5 lbs)", brand: "Kirkland Signature", protein: 8, calories: 170, servingSize: "1/4 cup dry", price: 7.99, category: "plant", storeExclusive: true },
      { id: "cos-7", name: "Chicken Breast (bulk)", brand: "Kirkland Signature", protein: 26, calories: 120, servingSize: "4 oz", price: 2.99, category: "meat", storeExclusive: false },
      { id: "cos-8", name: "Wild Salmon (frozen)", brand: "Kirkland Signature", protein: 23, calories: 180, servingSize: "4 oz", price: 8.99, category: "seafood", storeExclusive: true },
      { id: "cos-9", name: "Greek Yogurt (tub)", brand: "Kirkland Signature", protein: 15, calories: 120, servingSize: "3/4 cup", price: 6.49, category: "dairy", storeExclusive: true },
      { id: "cos-10", name: "Egg Whites (liquid)", brand: "Kirkland Signature", protein: 5, calories: 25, servingSize: "3 tbsp", price: 5.99, category: "other", storeExclusive: true },
    ],
  },
];

export function getHighProteinItems(
  storeKey: string,
  options?: {
    minProtein?: number;
    category?: string;
    sortBy?: "protein" | "price" | "calories";
  }
): HighProteinItem[] {
  const store = HIGH_PROTEIN_STORES.find((s) => s.storeKey === storeKey);
  if (!store) return [];

  let items = [...store.items];

  if (options?.minProtein) {
    items = items.filter((i) => i.protein >= options.minProtein!);
  }

  if (options?.category && options.category !== "all") {
    items = items.filter((i) => i.category === options.category);
  }

  if (options?.sortBy === "protein") {
    items.sort((a, b) => b.protein - a.protein);
  } else if (options?.sortBy === "price") {
    items.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  } else if (options?.sortBy === "calories") {
    items.sort((a, b) => a.calories - b.calories);
  } else {
    // Default: sort by protein descending
    items.sort((a, b) => b.protein - a.protein);
  }

  return items;
}
