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

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProduct(barcode: string): Promise<ScannedProduct | undefined>;
  upsertProduct(product: InsertScannedProduct): Promise<ScannedProduct>;
  getAllProducts(search?: string, tier?: string, store?: string): Promise<ScannedProduct[]>;
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
  ): Promise<ScannedProduct[]> {
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

    // Tier filter — ingredient-flags only (no score fallback)
    // Green ("Solid Pick"):  Has good flags, NO bad flags (caution alongside good is fine)
    // Yellow ("Not Bad"):    Has only caution flags (no good, no bad) OR no flagged ingredients at all
    // Red ("Be Honest"):     Has ANY bad flags
    if (tier === "green") {
      conditions.push(
        sql`(
          ${scannedProducts.ingredients} IS NOT NULL
          AND EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'good')
          AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(${scannedProducts.ingredients}) elem WHERE elem->>'flag' = 'bad')
        )`,
      );
    } else if (tier === "yellow") {
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

    const query = db
      .select()
      .from(scannedProducts)
      .orderBy(desc(scannedProducts.updatedAt))
      .limit(1000);

    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }

    return query;
  }
}

export const storage = new DatabaseStorage();
