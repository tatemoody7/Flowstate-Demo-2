// Server-side copy of client/services/openFoodFactsApi.ts
// Fetches from Open Food Facts, grades products, and returns InsertScannedProduct shape.

import type { InsertScannedProduct } from "@shared/schema";
import {
  parseAndFlagIngredients,
  calculateIngredientScoreModifier,
} from "./ingredientKnowledge";

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
const USER_AGENT = "FlowstateApp/1.0 (Server; Node.js)";
const TIMEOUT_MS = 8000;

// ─── Rate Limiter ────────────────────────────────────────────────────────────

let requestTimestamps: number[] = [];
const MAX_REQUESTS_PER_SECOND = 10;
let rateLimitLock: Promise<void> = Promise.resolve();

async function waitForRateLimit(): Promise<void> {
  const previousLock = rateLimitLock;
  let resolve: () => void;
  rateLimitLock = new Promise<void>((r) => {
    resolve = r;
  });
  await previousLock;

  const now = Date.now();
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
  barcode: string,
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
      },
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
  ingredientModifier: number,
): number {
  let score = 50;

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

    if (protein > 10) score += Math.min(15, Math.round(protein));
    if (fiber > 2) score += Math.min(10, Math.round(fiber * 2));
    if (sugar > 10) score -= Math.min(15, Math.round(sugar - 10));
    if (sodium > 0.3) score -= Math.min(10, Math.round((sodium - 0.3) * 20));
  }

  score += ingredientModifier;

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Transform ───────────────────────────────────────────────────────────────

export function transformToProduct(
  barcode: string,
  product: OpenFoodFactsProduct,
): InsertScannedProduct {
  const n = product.nutriments;

  const flaggedIngredients = product.ingredients_text
    ? parseAndFlagIngredients(product.ingredients_text)
    : undefined;

  const ingredientModifier = flaggedIngredients
    ? calculateIngredientScoreModifier(flaggedIngredients)
    : 0;

  const hasServing = !!(n?.["energy-kcal_serving"] || n?.proteins_serving);

  return {
    barcode,
    name: product.product_name || "Unknown Product",
    brand: product.brands || "Unknown Brand",
    image:
      product.image_front_url ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    healthScore: calculateHealthScore(product, ingredientModifier),
    calories: Math.round(
      (hasServing ? n?.["energy-kcal_serving"] : undefined) ??
        n?.["energy-kcal_100g"] ??
        n?.["energy-kcal"] ??
        0,
    ),
    protein: Math.round(
      (hasServing ? n?.proteins_serving : undefined) ??
        n?.proteins_100g ??
        n?.proteins ??
        0,
    ),
    carbs: Math.round(
      (hasServing ? n?.carbohydrates_serving : undefined) ??
        n?.carbohydrates_100g ??
        n?.carbohydrates ??
        0,
    ),
    fat: Math.round(
      (hasServing ? n?.fat_serving : undefined) ??
        n?.fat_100g ??
        n?.fat ??
        0,
    ),
    fiber: Math.round(
      (hasServing ? n?.fiber_serving : undefined) ??
        n?.fiber_100g ??
        n?.fiber ??
        0,
    ),
    sugar: Math.round(
      (hasServing ? n?.sugars_serving : undefined) ??
        n?.sugars_100g ??
        n?.sugars ??
        0,
    ),
    sodium: (() => {
      const rawSodium =
        (hasServing ? n?.sodium_serving : undefined) ??
        n?.sodium_100g ??
        n?.sodium ??
        0;
      const sodiumMg = rawSodium > 5 ? rawSodium : rawSodium * 1000;
      return Math.round(sodiumMg);
    })(),
    ingredients: flaggedIngredients ?? null,
    ingredientsRaw: product.ingredients_text ?? null,
    allergens: product.allergens_text ?? null,
    additives: product.additives_tags ?? null,
    nutritionGrade: product.nutrition_grades ?? null,
    servingSize: product.serving_size ?? null,
  };
}

// ─── Search API ─────────────────────────────────────────────────────────────

export interface OpenFoodFactsSearchResponse {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: (OpenFoodFactsProduct & {
    code?: string;
    stores_tags?: string[];
    stores?: string;
  })[];
}

// Search rate limiter: 10 req/min (stricter than barcode lookup)
let searchTimestamps: number[] = [];
const MAX_SEARCH_PER_MIN = 10;

async function waitForSearchRateLimit(): Promise<void> {
  const now = Date.now();
  searchTimestamps = searchTimestamps.filter((t) => t >= now - 60000);
  if (searchTimestamps.length >= MAX_SEARCH_PER_MIN) {
    const waitTime = searchTimestamps[0] + 60000 - now;
    console.log(
      `Search rate limit: waiting ${Math.round(waitTime / 1000)}s...`,
    );
    await new Promise((res) => setTimeout(res, Math.max(0, waitTime)));
  }
  searchTimestamps.push(Date.now());
}

const SEARCH_API_BASE = "https://world.openfoodfacts.net/api/v2/search";
const SEARCH_FIELDS = FIELDS + ",stores_tags,stores";

export async function searchProducts(params: {
  stores_tags?: string;
  categories_tags_en?: string;
  brands_tags?: string;
  page_size?: number;
  page?: number;
}): Promise<OpenFoodFactsSearchResponse> {
  await waitForSearchRateLimit();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const url = new URL(SEARCH_API_BASE);
    url.searchParams.set("fields", SEARCH_FIELDS + ",code");
    url.searchParams.set("page_size", String(params.page_size ?? 100));
    url.searchParams.set("page", String(params.page ?? 1));
    url.searchParams.set("countries_tags_en", "united-states");

    if (params.stores_tags) {
      url.searchParams.set("stores_tags", params.stores_tags);
    }
    if (params.categories_tags_en) {
      url.searchParams.set("categories_tags_en", params.categories_tags_en);
    }
    if (params.brands_tags) {
      url.searchParams.set("brands_tags", params.brands_tags);
    }

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": USER_AGENT },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Search HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}
