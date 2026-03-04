/**
 * Seed script: Populates the product database with real products from Open Food Facts.
 * Uses only confirmed store_tags data — no guessing.
 *
 * Run: npx tsx scripts/seedProducts.ts
 * Takes ~3 minutes due to OFF search API rate limit (10 req/min).
 */

import {
  searchProducts,
  transformToProduct,
  type OpenFoodFactsProduct,
  type OpenFoodFactsSearchResponse,
} from "../server/services/openFoodFacts";
import { storage } from "../server/storage";
import type { InsertScannedProduct } from "../shared/schema";

// ─── Store Config ───────────────────────────────────────────────────────────

interface StoreConfig {
  store: string;
  tag: string;
  pages: number;
}

const STORE_CONFIGS: StoreConfig[] = [
  { store: "Walmart", tag: "walmart", pages: 5 },
  { store: "Costco", tag: "costco", pages: 5 },
  { store: "ALDI", tag: "aldi", pages: 5 },
  { store: "Trader Joe's", tag: "trader-joe-s", pages: 2 },
  { store: "Whole Foods", tag: "whole-foods", pages: 2 },
  { store: "Target", tag: "target", pages: 2 },
  { store: "Publix", tag: "publix", pages: 2 },
  { store: "Sprouts", tag: "sprouts", pages: 1 },
  { store: "The Fresh Market", tag: "the-fresh-market", pages: 1 },
];

// ─── Quality Filter ─────────────────────────────────────────────────────────

type SearchProduct = OpenFoodFactsProduct & {
  code?: string;
  stores_tags?: string[];
  stores?: string;
};

function isValidProduct(product: SearchProduct): boolean {
  if (!product.code || product.code.length < 4) return false;
  if (!product.product_name || product.product_name.trim().length === 0)
    return false;
  if (!product.nutriments) return false;

  const n = product.nutriments;
  const hasCalories =
    (n["energy-kcal_100g"] ?? n["energy-kcal"] ?? 0) > 0;
  const hasProtein = (n.proteins_100g ?? n.proteins) !== undefined;

  if (!hasCalories && !hasProtein) return false;
  return true;
}

// ─── Main Seed Function ─────────────────────────────────────────────────────

async function seed() {
  console.log("=== Flowstate Product Database Seed ===\n");

  // Map<barcode, { product, stores }> for deduplication + store merging
  const productMap = new Map<
    string,
    { product: InsertScannedProduct; stores: Set<string> }
  >();

  let totalApiCalls = 0;

  for (const config of STORE_CONFIGS) {
    console.log(`\n--- ${config.store} (tag: ${config.tag}, pages: ${config.pages}) ---`);

    for (let page = 1; page <= config.pages; page++) {
      console.log(`  Page ${page}/${config.pages}...`);

      try {
        totalApiCalls++;
        const result: OpenFoodFactsSearchResponse = await searchProducts({
          stores_tags: config.tag,
          page_size: 100,
          page,
        });

        console.log(
          `  Got ${result.products.length} results (${result.count} total for this store)`,
        );

        let pageValid = 0;

        for (const offProduct of result.products) {
          if (!isValidProduct(offProduct)) continue;

          const barcode = offProduct.code!;

          if (productMap.has(barcode)) {
            // Already seen — just add this store
            productMap.get(barcode)!.stores.add(config.store);
          } else {
            // New product — transform and store
            const product = transformToProduct(barcode, offProduct);
            productMap.set(barcode, {
              product,
              stores: new Set([config.store]),
            });
          }
          pageValid++;
        }

        console.log(`  Valid: ${pageValid}`);

        // If we got fewer than 100, no more pages
        if (result.products.length < 100) {
          console.log(`  No more pages for ${config.store}`);
          break;
        }
      } catch (err) {
        console.error(`  Error fetching ${config.store} page ${page}:`, err);
      }
    }
  }

  console.log(`\n--- Inserting ${productMap.size} unique products ---`);
  console.log(`(Made ${totalApiCalls} API calls)\n`);

  let inserted = 0;
  let errors = 0;

  for (const [barcode, { product, stores }] of productMap) {
    try {
      await storage.upsertProduct({
        ...product,
        stores: Array.from(stores),
      });
      inserted++;

      if (inserted % 100 === 0) {
        console.log(`  Inserted ${inserted}/${productMap.size}...`);
      }
    } catch (err) {
      errors++;
      if (errors <= 5) {
        console.error(`  Error inserting ${barcode} (${product.name}):`, err);
      }
    }
  }

  console.log(`\n=== Seed complete ===`);
  console.log(`  Products inserted: ${inserted}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  API calls made: ${totalApiCalls}`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed script failed:", err);
  process.exit(1);
});
