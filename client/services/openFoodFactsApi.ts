import type { ScannedFood } from "@/data/mockData";
import {
  parseAndFlagIngredients,
  calculateIngredientScoreModifier,
} from "@/data/ingredientKnowledge";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OpenFoodFactsProduct {
  product_name?: string;
  brands?: string;
  image_front_url?: string;
  nutrition_grades?: string;
  serving_size?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    "energy-kcal"?: number;
    "energy-kcal_serving"?: number;
    proteins_100g?: number;
    proteins?: number;
    proteins_serving?: number;
    fat_100g?: number;
    fat?: number;
    fat_serving?: number;
    carbohydrates_100g?: number;
    carbohydrates?: number;
    carbohydrates_serving?: number;
    sugars_100g?: number;
    sugars?: number;
    sugars_serving?: number;
    fiber_100g?: number;
    fiber?: number;
    fiber_serving?: number;
    sodium_100g?: number;
    sodium?: number;
    sodium_serving?: number;
  };
  ingredients_text?: string;
  allergens_text?: string;
  additives_tags?: string[];
}

export interface OpenFoodFactsResponse {
  status: 0 | 1;
  product?: OpenFoodFactsProduct;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = "https://world.openfoodfacts.org/api/v2/product";
const FIELDS =
  "product_name,nutrition_grades,nutriments,allergens_text,ingredients_text,additives_tags,brands,image_front_url,serving_size";
const USER_AGENT = "FlowstateApp/1.0 (React Native; Expo)";
const TIMEOUT_MS = 8000;

// ─── Rate Limiter ────────────────────────────────────────────────────────────

let requestTimestamps: number[] = [];
const MAX_REQUESTS_PER_SECOND = 10;
let rateLimitLock: Promise<void> = Promise.resolve();

async function waitForRateLimit(): Promise<void> {
  // Chain rate limit checks sequentially to prevent race conditions
  const previousLock = rateLimitLock;
  let resolve: () => void;
  rateLimitLock = new Promise<void>((r) => {
    resolve = r;
  });
  await previousLock;

  const now = Date.now();
  // Remove timestamps older than 1 second (filter instead of shift for O(1) amortized)
  requestTimestamps = requestTimestamps.filter((t) => t >= now - 1000);
  if (requestTimestamps.length >= MAX_REQUESTS_PER_SECOND) {
    const waitTime = requestTimestamps[0] + 1000 - now;
    await new Promise((res) => setTimeout(res, Math.max(0, waitTime)));
  }
  requestTimestamps.push(Date.now());
  resolve!();
}

// ─── Fetch ───────────────────────────────────────────────────────────────────

export async function fetchProduct(
  barcode: string
): Promise<OpenFoodFactsResponse> {
  await waitForRateLimit();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(
      `${API_BASE}/${barcode}?fields=${FIELDS}`,
      {
        headers: { "User-Agent": USER_AGENT },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Health Score Calculation ─────────────────────────────────────────────────

function calculateHealthScore(
  product: OpenFoodFactsProduct,
  ingredientModifier: number
): number {
  let score = 50;

  // Nutrition grade bonus/penalty
  const gradeMap: Record<string, number> = {
    a: 30,
    b: 15,
    c: 0,
    d: -15,
    e: -25,
  };
  if (product.nutrition_grades) {
    score += gradeMap[product.nutrition_grades] ?? 0;
  }

  const n = product.nutriments;
  if (n) {
    const protein = n.proteins_100g ?? n.proteins ?? 0;
    const fiber = n.fiber_100g ?? n.fiber ?? 0;
    const sugar = n.sugars_100g ?? n.sugars ?? 0;
    const sodium = n.sodium_100g ?? n.sodium ?? 0;

    // Protein bonus: 0-15 points
    if (protein > 10) score += Math.min(15, Math.round(protein));

    // Fiber bonus: 0-10 points
    if (fiber > 2) score += Math.min(10, Math.round(fiber * 2));

    // Sugar penalty: 0 to -15 points
    if (sugar > 10) score -= Math.min(15, Math.round(sugar - 10));

    // Sodium penalty: 0 to -10 points (sodium in g, 0.6g+ is high)
    if (sodium > 0.3) score -= Math.min(10, Math.round((sodium - 0.3) * 20));
  }

  // Ingredient quality adjustment
  score += ingredientModifier;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Transform ───────────────────────────────────────────────────────────────

export function transformToScannedFood(
  barcode: string,
  product: OpenFoodFactsProduct
): ScannedFood {
  const n = product.nutriments;

  // Parse and flag ingredients
  const flaggedIngredients = product.ingredients_text
    ? parseAndFlagIngredients(product.ingredients_text)
    : undefined;

  const ingredientModifier = flaggedIngredients
    ? calculateIngredientScoreModifier(flaggedIngredients)
    : 0;

  // Prefer per-serving values when available, fall back to per-100g
  const hasServing = !!(n?.["energy-kcal_serving"] || n?.proteins_serving);

  return {
    id: `off-${barcode}`,
    name: product.product_name || "Unknown Product",
    brand: product.brands || "Unknown Brand",
    image:
      product.image_front_url ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    healthScore: calculateHealthScore(product, ingredientModifier),
    calories: Math.round(
      (hasServing ? n?.["energy-kcal_serving"] : undefined) ?? n?.["energy-kcal_100g"] ?? n?.["energy-kcal"] ?? 0
    ),
    protein: Math.round(
      (hasServing ? n?.proteins_serving : undefined) ?? n?.proteins_100g ?? n?.proteins ?? 0
    ),
    carbs: Math.round(
      (hasServing ? n?.carbohydrates_serving : undefined) ?? n?.carbohydrates_100g ?? n?.carbohydrates ?? 0
    ),
    fat: Math.round(
      (hasServing ? n?.fat_serving : undefined) ?? n?.fat_100g ?? n?.fat ?? 0
    ),
    fiber: Math.round(
      (hasServing ? n?.fiber_serving : undefined) ?? n?.fiber_100g ?? n?.fiber ?? 0
    ),
    sugar: Math.round(
      (hasServing ? n?.sugars_serving : undefined) ?? n?.sugars_100g ?? n?.sugars ?? 0
    ),
    sodium: (() => {
      const rawSodium = (hasServing ? n?.sodium_serving : undefined) ?? n?.sodium_100g ?? n?.sodium ?? 0;
      // OFF returns sodium in grams; if value > 5 it's likely already in mg (data error)
      const sodiumMg = rawSodium > 5 ? rawSodium : rawSodium * 1000;
      return Math.round(sodiumMg);
    })(),
    prices: [],
    ingredients: flaggedIngredients,
    ingredientsRaw: product.ingredients_text,
    allergens: product.allergens_text,
    additives: product.additives_tags,
    nutritionGrade: product.nutrition_grades,
    barcode,
    servingSize: product.serving_size,
  };
}
