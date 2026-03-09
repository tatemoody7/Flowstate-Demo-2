import {
  type User,
  type InsertUser,
  type ScannedProduct,
  type InsertScannedProduct,
  users,
  scannedProducts,
} from "@shared/schema";
import { eq, desc, ilike, or, and, sql, SQL } from "drizzle-orm";
import { db } from "./db";

export interface PaginatedProducts {
  products: ScannedProduct[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProduct(barcode: string): Promise<ScannedProduct | undefined>;
  upsertProduct(product: InsertScannedProduct): Promise<ScannedProduct>;
  getAllProducts(
    search?: string,
    tier?: string,
    store?: string,
    limit?: number,
    cursor?: string,
  ): Promise<PaginatedProducts>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProduct(barcode: string): Promise<ScannedProduct | undefined> {
    const [product] = await db
      .select()
      .from(scannedProducts)
      .where(eq(scannedProducts.barcode, barcode));
    return product;
  }

  async upsertProduct(
    product: InsertScannedProduct,
  ): Promise<ScannedProduct> {
    const [result] = await db
      .insert(scannedProducts)
      .values(product)
      .onConflictDoUpdate({
        target: scannedProducts.barcode,
        set: {
          name: product.name,
          brand: product.brand,
          image: product.image,
          healthScore: product.healthScore,
          calories: product.calories,
          protein: product.protein,
          carbs: product.carbs,
          fat: product.fat,
          fiber: product.fiber,
          sugar: product.sugar,
          sodium: product.sodium,
          ingredients: product.ingredients,
          ingredientsRaw: product.ingredientsRaw,
          allergens: product.allergens,
          additives: product.additives,
          nutritionGrade: product.nutritionGrade,
          servingSize: product.servingSize,
          stores: product.stores
            ? sql`(
                SELECT jsonb_agg(DISTINCT value)
                FROM jsonb_array_elements(
                  COALESCE(${scannedProducts.stores}, '[]'::jsonb) || ${JSON.stringify(product.stores)}::jsonb
                )
              )`
            : scannedProducts.stores,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }
  async getAllProducts(
    search?: string,
    tier?: string,
    store?: string,
    limit: number = 30,
    cursor?: string,
  ): Promise<PaginatedProducts> {
    const conditions: SQL[] = [];

    // Search filter — match name or brand (case-insensitive)
    if (search && search.trim()) {
      const pattern = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(scannedProducts.name, pattern),
          ilike(scannedProducts.brand, pattern),
        )!,
      );
    }

    // Tier filter — server acts as a rough pre-filter; client post-filter
    // applies the precise ratio-based grading logic.
    //
    // Green ("Solid Pick"):  Has good flags, NO bad flags — exact match
    // Yellow ("Not Bad"):    Superset — caution-only, no-flags, OR has bad (client narrows via ratio)
    // Red ("Be Honest"):     Superset — has ANY bad flags (client narrows via ratio)
    if (tier === "green") {
      conditions.push(
        sql`(
          ${scannedProducts.ingredients} IS NOT NULL
          AND EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'good')
          AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'bad')
        )`,
      );
    } else if (tier === "yellow") {
      // Widened: includes products with bad ingredients (some may be yellow under ratio logic)
      // Client post-filter recalculates tier and removes products that are actually red
      conditions.push(
        sql`(
          (
            ${scannedProducts.ingredients} IS NOT NULL
            AND EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'caution')
            AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'good')
            AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'bad')
          )
          OR (
            ${scannedProducts.ingredients} IS NULL
            OR NOT EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' IN ('good','bad','caution'))
          )
          OR (
            ${scannedProducts.ingredients} IS NOT NULL
            AND EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'bad')
          )
        )`,
      );
    } else if (tier === "red") {
      conditions.push(
        sql`(
          ${scannedProducts.ingredients} IS NOT NULL
          AND EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'bad')
        )`,
      );
    }

    // Store filter — JSONB contains
    if (store && store.trim()) {
      conditions.push(
        sql`${scannedProducts.stores} @> ${JSON.stringify([store.trim()])}::jsonb`,
      );
    }

    // Cursor-based pagination (keyset on updatedAt DESC, barcode ASC)
    if (cursor) {
      const separatorIdx = cursor.indexOf("|");
      if (separatorIdx > 0) {
        const cursorTimestamp = cursor.slice(0, separatorIdx);
        const cursorBarcode = cursor.slice(separatorIdx + 1);
        const cursorDate = new Date(cursorTimestamp);
        conditions.push(
          sql`(
            ${scannedProducts.updatedAt} < ${cursorDate}
            OR (
              ${scannedProducts.updatedAt} = ${cursorDate}
              AND ${scannedProducts.barcode} > ${cursorBarcode}
            )
          )`,
        );
      }
    }

    // Fetch limit+1 to determine hasMore without a separate COUNT query
    const fetchLimit = limit + 1;

    const query = db
      .select()
      .from(scannedProducts)
      .orderBy(desc(scannedProducts.updatedAt), scannedProducts.barcode)
      .limit(fetchLimit);

    const results = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    const hasMore = results.length > limit;
    const products = hasMore ? results.slice(0, limit) : results;

    let nextCursor: string | null = null;
    if (hasMore && products.length > 0) {
      const last = products[products.length - 1];
      nextCursor = `${last.updatedAt.toISOString()}|${last.barcode}`;
    }

    return { products, nextCursor, hasMore };
  }
}

export const storage = new DatabaseStorage();
