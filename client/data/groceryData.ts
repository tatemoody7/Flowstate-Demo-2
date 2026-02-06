export interface GroceryItem {
  name: string;
  prices: {
    publix: number | null;
    wholeFoods: number | null;
    target: number | null;
    walmart: number | null;
    traderJoes: number | null;
  };
  healthy: boolean;
  alternative?: string;
  category: "protein" | "produce" | "grain" | "dairy" | "snack" | "drink" | "other";
}

export const GROCERY_STORES = [
  { key: "publix" as const, name: "Publix", distance: "0.9 mi" },
  { key: "wholeFoods" as const, name: "Whole Foods", distance: "1.8 mi" },
  { key: "target" as const, name: "Target", distance: "2.3 mi" },
  { key: "walmart" as const, name: "Walmart", distance: "3.1 mi" },
  { key: "traderJoes" as const, name: "Trader Joe's", distance: "5.5 mi" },
];

export const GROCERY_DATA: Record<string, GroceryItem> = {
  "chicken breast": {
    name: "Chicken Breast",
    prices: { publix: 3.99, wholeFoods: 6.99, target: 4.49, walmart: 3.29, traderJoes: 4.29 },
    healthy: true,
    category: "protein",
  },
  "ground turkey": {
    name: "Ground Turkey",
    prices: { publix: 4.49, wholeFoods: 6.49, target: 4.99, walmart: 3.79, traderJoes: 4.99 },
    healthy: true,
    category: "protein",
  },
  "salmon fillet": {
    name: "Salmon Fillet",
    prices: { publix: 9.99, wholeFoods: 12.99, target: 8.99, walmart: 7.99, traderJoes: 8.49 },
    healthy: true,
    category: "protein",
  },
  "eggs": {
    name: "Eggs (dozen)",
    prices: { publix: 3.49, wholeFoods: 4.99, target: 3.29, walmart: 2.98, traderJoes: 3.49 },
    healthy: true,
    category: "protein",
  },
  "greek yogurt": {
    name: "Greek Yogurt",
    prices: { publix: 5.49, wholeFoods: 6.99, target: 4.99, walmart: 4.49, traderJoes: 4.79 },
    healthy: true,
    category: "dairy",
  },
  "brown rice": {
    name: "Brown Rice",
    prices: { publix: 2.49, wholeFoods: 3.99, target: 2.29, walmart: 1.98, traderJoes: 2.49 },
    healthy: true,
    category: "grain",
  },
  "quinoa": {
    name: "Quinoa",
    prices: { publix: 4.99, wholeFoods: 5.99, target: 4.49, walmart: 3.98, traderJoes: 3.99 },
    healthy: true,
    category: "grain",
  },
  "oats": {
    name: "Rolled Oats",
    prices: { publix: 3.29, wholeFoods: 4.49, target: 2.99, walmart: 2.48, traderJoes: 2.99 },
    healthy: true,
    category: "grain",
  },
  "sweet potato": {
    name: "Sweet Potatoes",
    prices: { publix: 1.49, wholeFoods: 1.99, target: 1.29, walmart: 0.98, traderJoes: 1.49 },
    healthy: true,
    category: "produce",
  },
  "broccoli": {
    name: "Broccoli",
    prices: { publix: 1.99, wholeFoods: 2.99, target: 1.79, walmart: 1.49, traderJoes: 1.99 },
    healthy: true,
    category: "produce",
  },
  "spinach": {
    name: "Baby Spinach",
    prices: { publix: 3.99, wholeFoods: 4.99, target: 3.49, walmart: 2.98, traderJoes: 2.99 },
    healthy: true,
    category: "produce",
  },
  "avocado": {
    name: "Avocados",
    prices: { publix: 1.49, wholeFoods: 1.99, target: 1.29, walmart: 0.98, traderJoes: 0.99 },
    healthy: true,
    category: "produce",
  },
  "banana": {
    name: "Bananas (bunch)",
    prices: { publix: 0.69, wholeFoods: 0.79, target: 0.59, walmart: 0.49, traderJoes: 0.19 },
    healthy: true,
    category: "produce",
  },
  "blueberries": {
    name: "Blueberries",
    prices: { publix: 4.99, wholeFoods: 5.99, target: 3.99, walmart: 3.49, traderJoes: 3.49 },
    healthy: true,
    category: "produce",
  },
  "almond butter": {
    name: "Almond Butter",
    prices: { publix: 8.99, wholeFoods: 9.99, target: 7.49, walmart: 6.98, traderJoes: 5.99 },
    healthy: true,
    category: "other",
  },
  "protein powder": {
    name: "Protein Powder",
    prices: { publix: 24.99, wholeFoods: 29.99, target: 21.99, walmart: 19.98, traderJoes: null },
    healthy: true,
    category: "protein",
  },
  "ice cream": {
    name: "Ice Cream (pint)",
    prices: { publix: 4.99, wholeFoods: 6.49, target: 3.99, walmart: 3.49, traderJoes: 3.99 },
    healthy: false,
    alternative: "Protein ice cream or frozen yogurt",
    category: "snack",
  },
  "hot cheetos": {
    name: "Hot Cheetos",
    prices: { publix: 3.49, wholeFoods: null, target: 3.29, walmart: 2.98, traderJoes: null },
    healthy: false,
    alternative: "Baked veggie chips",
    category: "snack",
  },
  "soda": {
    name: "Soda (12-pack)",
    prices: { publix: 5.99, wholeFoods: null, target: 4.99, walmart: 4.48, traderJoes: null },
    healthy: false,
    alternative: "Sparkling water or kombucha",
    category: "drink",
  },
  "energy drink": {
    name: "Energy Drink",
    prices: { publix: 2.99, wholeFoods: 3.49, target: 2.79, walmart: 2.48, traderJoes: 2.79 },
    healthy: false,
    alternative: "Black coffee or matcha",
    category: "drink",
  },
  "ramen noodles": {
    name: "Instant Ramen",
    prices: { publix: 0.49, wholeFoods: null, target: 0.39, walmart: 0.25, traderJoes: null },
    healthy: false,
    alternative: "Whole grain pasta or rice noodles",
    category: "grain",
  },
  "frozen pizza": {
    name: "Frozen Pizza",
    prices: { publix: 6.99, wholeFoods: 8.99, target: 5.99, walmart: 4.98, traderJoes: 4.49 },
    healthy: false,
    alternative: "Cauliflower crust pizza or homemade flatbread",
    category: "other",
  },
  "white bread": {
    name: "White Bread",
    prices: { publix: 2.99, wholeFoods: 4.49, target: 2.49, walmart: 1.48, traderJoes: 2.49 },
    healthy: false,
    alternative: "Whole grain or sourdough bread",
    category: "grain",
  },
  "olive oil": {
    name: "Extra Virgin Olive Oil",
    prices: { publix: 7.99, wholeFoods: 9.99, target: 6.99, walmart: 5.98, traderJoes: 5.99 },
    healthy: true,
    category: "other",
  },
  "almonds": {
    name: "Raw Almonds",
    prices: { publix: 8.49, wholeFoods: 9.99, target: 7.49, walmart: 6.48, traderJoes: 5.99 },
    healthy: true,
    category: "snack",
  },
  "cottage cheese": {
    name: "Cottage Cheese",
    prices: { publix: 3.99, wholeFoods: 4.99, target: 3.49, walmart: 2.98, traderJoes: 3.49 },
    healthy: true,
    category: "dairy",
  },
};

export function searchGrocery(query: string): GroceryItem | null {
  const normalized = query.toLowerCase().trim();
  if (GROCERY_DATA[normalized]) return GROCERY_DATA[normalized];
  const keys = Object.keys(GROCERY_DATA);
  const match = keys.find(
    (k) => k.includes(normalized) || normalized.includes(k)
  );
  return match ? GROCERY_DATA[match] : null;
}

export function getCheapestStore(item: GroceryItem): { store: string; price: number; distance: string } | null {
  let cheapest: { store: string; price: number; distance: string } | null = null;
  for (const store of GROCERY_STORES) {
    const price = item.prices[store.key];
    if (price !== null && (cheapest === null || price < cheapest.price)) {
      cheapest = { store: store.name, price, distance: store.distance };
    }
  }
  return cheapest;
}
