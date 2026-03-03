import {
  type User,
  type InsertUser,
  type ScannedProduct,
  type InsertScannedProduct,
  users,
  scannedProducts,
} from "@shared/schema";
import { eq, desc, ilike, or, gte, lt, and, SQL } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProduct(barcode: string): Promise<ScannedProduct | undefined>;
  upsertProduct(product: InsertScannedProduct): Promise<ScannedProduct>;
  getAllProducts(search?: string, tier?: string): Promise<ScannedProduct[]>;
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
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }
  async getAllProducts(
    search?: string,
    tier?: string,
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

    // Tier filter — map to healthScore ranges
    if (tier === "green") {
      conditions.push(gte(scannedProducts.healthScore, 65));
    } else if (tier === "yellow") {
      conditions.push(
        and(
          gte(scannedProducts.healthScore, 40),
          lt(scannedProducts.healthScore, 65),
        )!,
      );
    } else if (tier === "red") {
      conditions.push(lt(scannedProducts.healthScore, 40));
    }

    const query = db
      .select()
      .from(scannedProducts)
      .orderBy(desc(scannedProducts.updatedAt))
      .limit(50);

    if (conditions.length > 0) {
      return query.where(and(...conditions));
    }

    return query;
  }
}

export const storage = new DatabaseStorage();
